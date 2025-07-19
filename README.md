# Catalyseed - Tamil Nadu Innovation Platform

A comprehensive platform showcasing innovation and entrepreneurship activities across Tamil Nadu's educational institutions.

## 🔥 Firebase Integration

This project uses Firebase for authentication and data storage.

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project named "catalyseed-platform"
   - Enable Authentication and Firestore Database

2. **Update Firebase Configuration**
   - Replace the config in `src/config/firebase.ts` with your actual Firebase project credentials
   - Current config contains placeholder values

3. **Configure Authentication**
   - In Firebase Console, go to Authentication > Sign-in method
   - Enable "Email/Password" provider

4. **Set up Firestore Database**
   - Create a Firestore database in production mode
   - Set up the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      // Allow admins to read all user documents
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow authenticated users to read public data
    match /public/{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## 🚀 Features

### Authentication System
- **Email/Password Authentication** with Firebase
- **Role-based Access Control** (Admin, Startup, Institute, Investor, General)
- **Admin Security Code**: `150405` required for admin account creation
- **Profile Completion Flow** for role-specific information

### User Roles & Dashboards

#### 🔴 Admin Dashboard
- Platform management and oversight
- User verification and approval
- System analytics and monitoring
- Event management across all institutes

#### 🟣 Startup Dashboard
- Company profile management
- Investor connection tools
- Event participation tracking
- Performance analytics

#### 🔵 Institute Dashboard
- Student startup showcase
- Event creation and management
- Innovation metrics tracking
- Industry partnership management

#### 🟢 Investor Dashboard
- Startup discovery and evaluation
- Portfolio management
- Deal flow tracking
- Investment analytics

#### ⚪ General User Dashboard
- Community participation
- Event browsing and registration
- Network building
- Content engagement

### Profile Completion
After signup, users complete role-specific profiles:

- **Startup**: Company details, funding stage, business description, sectors
- **Institute**: Institution info, research areas, student count, programs
- **Investor**: Investment range, focus sectors, organization details
- **General**: Basic profile information (optional)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📱 Usage

### Creating Accounts

1. **Regular Users**: Choose account type and complete signup
2. **Admin Users**: Select "Administrator" and enter security code `150405`
3. **Profile Completion**: Fill role-specific information after signup

### Authentication Flow

1. **Signup** → **Email Verification** → **Profile Completion** → **Dashboard Access**
2. **Login** → **Dashboard** (based on user role)

## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📊 Database Structure

```
users/{userId}
├── name: string
├── email: string
├── role: 'admin' | 'startup' | 'institute' | 'investor' | 'general'
├── status: 'pending' | 'verified' | 'rejected'
├── profileCompleted: boolean
├── createdAt: timestamp
├── profile: {
│   ├── company?: string
│   ├── designation?: string
│   ├── location?: string
│   ├── bio?: string
│   ├── website?: string
│   ├── linkedin?: string
│   ├── fundingStage?: string (startup)
│   ├── investmentRange?: string (investor)
│   ├── sectors?: string[] (startup/investor)
│   ├── establishedYear?: string (institute)
│   ├── studentCount?: string (institute)
│   └── researchAreas?: string[] (institute)
│   }
└── updatedAt?: timestamp
```

## 🔐 Security Features

- **Admin Code Protection**: Secure code required for admin accounts
- **Role-based Access**: Different permissions for each user type
- **Firebase Security Rules**: Proper data access controls
- **Input Validation**: Client and server-side validation

## 🌟 Key Components

- `AuthContext`: Firebase authentication management
- `ProfileCompletionModal`: Role-specific profile setup
- `DashboardLayout`: Role-based dashboard routing
- `SignupModal`: Account creation with admin code validation
- `LoginModal`: User authentication interface

## 📝 Environment Setup

No `.env` file needed - Firebase configuration is included in the code. For production, move sensitive keys to environment variables.

## 🚀 Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred hosting platform
3. Ensure Firebase project is properly configured
4. Update security rules in Firestore

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.