export interface UserWithStats {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  logo?: string;
  applicationsCount: number;
  reviewsCount: number;
  savedJobsCount: number;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  search: string;
  role: string;
  page: number;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface UsersApiResponse {
  success: boolean;
  data: {
    users: UserWithStats[];
    pagination: PaginationData;
  };
  message?: string;
}
