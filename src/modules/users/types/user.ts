export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserDTO extends CreateUserDTO {
  id: number;
}
