import { Role } from '../enums/role.enum';

export interface IUserFromJwt {
  id: string;
  email: string;
  name: string;
  role: Role;
}
