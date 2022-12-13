export interface UserResponse {
  id: string;
  fullName: string;
  ipUser: string;
  role: "admin" | "user";
  username: string;
  password?: string;
}
