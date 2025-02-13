import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [AuthModule],
  exports: [CouponsService],
})
export class CouponsModule {}
