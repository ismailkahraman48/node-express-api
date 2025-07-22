import { IUserRepository } from "../interfaces/user.repository.interface";
import { CreateUserDTO } from "../../dto/user.dto";
import { User as MongooseUser, IUser } from "../../models/user.model";
import { User } from "../../types/user.type";

export class UserMongoRepository implements IUserRepository {
  async create(user: CreateUserDTO): Promise<User> {
    const created = await MongooseUser.create({ ...user, role: "user" });
    return this.toUser(created);
  }

  async findById(id: string): Promise<User | null> {
    const user = await MongooseUser.findById(id);
    return user ? this.toUser(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await MongooseUser.find();
    return users.map(this.toUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await MongooseUser.findOne({ email });
    return user ? this.toUser(user) : null;
  }

  private toUser(user: IUser): User {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.username,
      password: user.password,
      role: user.role,
    };
  }
}
