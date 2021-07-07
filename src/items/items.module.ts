import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes({ path: 'items', method: RequestMethod.POST })
  }
}