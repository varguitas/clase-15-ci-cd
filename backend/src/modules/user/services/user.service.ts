import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: IUser) {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: IUser) {
    const currentUser = await this.usersRepository.findOne({ where: { id } });
    if (currentUser) {
      currentUser.name = user.name;
      return this.usersRepository.save(currentUser);
    }
    return null;
  }

  delete(id: number) {
    return this.usersRepository.delete({ id });
  }
}
