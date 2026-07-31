import api from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};