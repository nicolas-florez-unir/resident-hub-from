export interface UserAuthenticatedDto {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
  };
  token: string;
}
