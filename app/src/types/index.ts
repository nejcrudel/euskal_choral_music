// Enums
export type ChoirType = 'SATB' | 'SSA' | 'TTBB' | 'SSAA' | 'SAB' | 'SA' | 'TB' | 'Unison' | 'Other';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type PurchaseStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type UserRole = 'user' | 'admin' | 'composer';

// Composer
export interface Composer {
  id: string;
  name: string;
  slug: string;
  biography?: string;
  birthYear?: number;
  deathYear?: number;
  birthplace?: string;
  photoUrl?: string;
  websiteUrl?: string;
  isFeatured: boolean;
  scoresCount?: number;
}

// Category
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  displayOrder: number;
}

// Tag
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// Score (Partitura)
export interface Score {
  id: string;
  title: string;
  slug: string;
  composerId: string;
  composer?: Composer;
  categoryId?: string;
  category?: Category;
  year?: number;
  choirType: ChoirType;
  language?: string;
  difficulty: DifficultyLevel;
  durationMinutes?: number;
  durationSeconds?: number;
  price: number;
  isFree: boolean;
  description?: string;
  coverImageUrl?: string;
  previewPages: number;
  pdfUrl?: string;
  audioSampleUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string;
}

// User
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  preferences?: {
    newsletter?: boolean;
    language?: string;
  };
}

// Cart Item
export interface CartItem {
  score: Score;
  quantity: number;
}

// Purchase Item
export interface PurchaseItem {
  id: string;
  scoreId: string;
  score?: Score;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Purchase
export interface Purchase {
  id: string;
  userId: string;
  orderNumber: string;
  totalAmount: number;
  currency: string;
  status: PurchaseStatus;
  paymentMethod?: string;
  paymentId?: string;
  invoiceNumber?: string;
  createdAt: string;
  completedAt?: string;
  items: PurchaseItem[];
}

// Download Log
export interface DownloadLog {
  id: string;
  userId: string;
  scoreId: string;
  purchaseId: string;
  downloadToken: string;
  ipAddress?: string;
  userAgent?: string;
  downloadedAt: string;
  expiresAt: string;
}

// Favorite
export interface Favorite {
  userId: string;
  scoreId: string;
  createdAt: string;
  score?: Score;
}

// Filter Options
export interface ScoreFilters {
  search?: string;
  composerId?: string;
  categoryId?: string;
  choirType?: ChoirType;
  difficulty?: DifficultyLevel;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  isFree?: boolean;
  tags?: string[];
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'name';
}

// SEO Metadata
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    perPage?: number;
    totalPages?: number;
  };
}

// Preview Modal State
export interface PreviewState {
  isOpen: boolean;
  score: Score | null;
  currentPage: number;
}

// Auth State
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Toast Notification
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
