export interface SignInDTO {
  email: string;
  token: string;
  username: string;
  image?: string;
}

interface User {
  email: string;
  token: string;
  username: string;
  image?: string;
}
