export interface Patient {
  patient_code: string;
  first_name: string;
  last_name: string;
  age: number;
  phone: string;
  doctor: string;
  created_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PatientListResponse {
  items: Patient[];
  pagination: Pagination;
}