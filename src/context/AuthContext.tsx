import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthContextType, SignupData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: firebaseUser.uid,
              name: userData.name,
              email: firebaseUser.email!,
              role: userData.role,
              status: userData.status || 'pending',
              avatar: userData.avatar,
              createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              profile: userData.profile || {},
              profileCompleted: userData.profileCompleted || false
            };
            setUser(user);
            
            // Show profile completion if not completed
            if (!user.profileCompleted && user.role !== 'general') {
              setShowProfileCompletion(true);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (userData: SignupData, adminCode?: string): Promise<{ success: boolean; needsProfileCompletion?: boolean }> => {
    try {
      setIsLoading(true);
      
      // Validate admin code if role is admin
      if (userData.role === 'admin' && adminCode !== '150405') {
        throw new Error('Invalid admin code');
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      // Create user document in Firestore
      const userDoc = {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.role === 'admin' ? 'verified' : 'pending',
        createdAt: serverTimestamp(),
        profileCompleted: userData.role === 'general', // General users don't need profile completion
        profile: userData.role === 'general' ? (userData.profile || {}) : {}
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

      // If not general user, they need to complete profile
      const needsProfileCompletion = userData.role !== 'general';
      
      return { success: true, needsProfileCompletion };
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowProfileCompletion(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const completeProfile = async (profileData: any): Promise<boolean> => {
    try {
      if (!user) return false;
      
      setIsLoading(true);
      
      // Update user document with profile data
      await updateDoc(doc(db, 'users', user.id), {
        profile: profileData,
        profileCompleted: true,
        updatedAt: serverTimestamp()
      });

      // Update local user state
      setUser(prev => prev ? {
        ...prev,
        profile: profileData,
        profileCompleted: true
      } : null);

      setShowProfileCompletion(false);
      return true;
    } catch (error) {
      console.error('Profile completion error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      isLoading,
      showProfileCompletion,
      setShowProfileCompletion,
      completeProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};