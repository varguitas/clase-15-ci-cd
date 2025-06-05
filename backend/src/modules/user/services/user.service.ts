import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
