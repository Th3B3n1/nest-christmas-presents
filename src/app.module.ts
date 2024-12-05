import { Module } from '@nestjs/common';
import { ToysModule } from './toys/toys.module';
import { ChildrenModule } from './children/children.module';

@Module({
  imports: [ToysModule, ChildrenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
