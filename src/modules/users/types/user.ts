export interface User {
  id: number;
  name: string;
  username: string | null;
  email: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  name: string;
  username: string | null;
  email: string;
  password: string;
  avatar: string | null;
}

export interface UpdateUserDTO extends CreateUserDTO {
  id: number;
}
