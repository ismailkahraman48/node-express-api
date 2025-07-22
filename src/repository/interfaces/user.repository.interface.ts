import { CreateUserDTO } from "../../dto/user.dto";
import { User } from "../../types/user.type";

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}
