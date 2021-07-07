import { Injectable } from '@nestjs/common';


@Injectable()
export class ItemsService {
  constructor() {}

  findAll(): string {
    return 'Find All Service'
  }

  findOne(id: string): string {
    return `Find One Service ${id}`
  }

}