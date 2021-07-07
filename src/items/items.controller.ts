import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Request, Response } from 'express';
import { ItemsService } from './items.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): string{
    return 'Hello World'
  }



  @ApiBearerAuth()
  @Post()
  create(@Body() createItemDto: CreateItemDto): string {
    return `You Are Now Authorized `
  }


  @Get(':id') 
  findOne(@Param('id') id) {
    return this.itemsService.findOne(id)
  }
  

}
