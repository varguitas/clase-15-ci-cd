import { Module } from '@nestjs/common';
import { TestModuleController } from './test-module.controller';

@Module({
  controllers: [TestModuleController]
})
export class TestModuleModule {}
