export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'startup' | 'institute' | 'investor' | 'general';
  status: 'pending' | 'verified' | 'rejected';
  avatar?: string;
  createdAt: string;
  profileCompleted?: boolean;
  profile?: {
    company?: string;
    designation?: string;
    location?: string;
    bio?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
    fundingStage?: string;
    investmentRange?: string;
    sectors?: string[];
    establishedYear?: string;
    studentCount?: string;
    researchAreas?: string[];
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData, adminCode?: string) => Promise<{ success: boolean; needsProfileCompletion?: boolean }>;
  isLoading: boolean;
  showProfileCompletion: boolean;
  setShowProfileCompletion: (show: boolean) => void;
  completeProfile: (profileData: any) => Promise<boolean>;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
  profile?: Partial<User['profile']>;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  createdAt: string;
  status: 'published' | 'pending' | 'rejected';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: User;
  date: string;
  location: string;
  type: 'hackathon' | 'workshop' | 'seminar' | 'networking';
  status: 'published' | 'pending' | 'rejected';
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
  tags: string[];
  prizePool?: string;
  createdAt: string;
}

export interface SuccessStory {
  id: string;
  innovatorName: string;
  mobile: string;
  email: string;
  webAddress?: string;
  linkedinProfile?: string;
  innovationCategory: 'EdTech' | 'FinTech' | 'AgriTech' | 'DeepTech' | 'Robotics' | 'Waste Management' | 'Pink Zone' | 'Campus Startups' | 'Other';
  yearOfInnovation: string;
  editedBy: string;
  aiVerdict?: string;
  inventorPhoto?: string;
  productServicePictures: string[];
  aboutStartup: string;
  currentStage: string;
  fundRaisedDetails?: string;
  teamDetails: string;
  studentAlumniOf: string;
  yearOrBatch: string;
  businessAddress: string;
  companyStartupName: string;
  productServiceName: string;
  customerSegment: string;
  lookingForInvestor: boolean;
  investmentRange?: string;
  mentorConnect: boolean;
  mentorDomainDetails?: string;
  tags: string[];
  likes?: number;
  createdAt: string;
  createdBy: string;
  status: 'published' | 'pending' | 'rejected';
  shareCount?: number;
  lastShared?: string;
  problemClarity?: number;
  marketOpportunity?: number;
  innovationUSP?: number;
  founderStrength?: number;
  traction?: number;
  scalability?: number;
  revenueModel?: number;
  impactPotential?: number;
  totalScore?: number;
}