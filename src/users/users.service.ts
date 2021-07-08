import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'eren',
      "username": "eren",
      "password": "123456"
    },
    {
      id: 2,
      name: 'eray',
      "username": "eray",
      "password": "123456"
    }
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username )
  }
}
