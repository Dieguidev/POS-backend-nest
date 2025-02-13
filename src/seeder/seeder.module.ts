import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PrismaModule } from '../shared/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SeederService],
})
export class SeederModule {}
