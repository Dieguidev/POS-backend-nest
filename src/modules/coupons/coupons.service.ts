import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/shared/database/prisma.service';
import { endOfDay, isAfter, parseISO } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCouponDto: CreateCouponDto) {
    return await this.prisma.coupon.create({
      data: {
        ...createCouponDto,
        expirationDate: parseISO(createCouponDto.expirationDate.toString()),
      },
    });
  }

  async findAll() {
    return await this.prisma.coupon.findMany();
  }

  async findOne(id: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) {
      throw new NotFoundException('Cupon no encontrado');
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    await this.findOne(id);
    return await this.prisma.coupon.update({
      where: { id },
      data: {
        ...updateCouponDto,
        expirationDate: parseISO(updateCouponDto.expirationDate.toString()),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.coupon.delete({ where: { id } });
  }

  async applyCoupon(couponName: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { name: couponName } });
    if (!coupon) {
      throw new NotFoundException('Cupon no encontrado');
    }

    const currentDate = new Date();
    const expirationDate = endOfDay(coupon.expirationDate);

    if (isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException('Cupon expirado');
    }

    return {
      message: 'Cupón Válido',
      ...coupon

    }

  }
}
