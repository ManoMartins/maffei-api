import { Role } from 'src/auth/enums/role.enum';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  documentNumber: string;
  gender: string;
  ranking?: number;
  phoneNumber: string;
  phoneNumberType: string;
  birthDate: string;
  role?: Role;
}
