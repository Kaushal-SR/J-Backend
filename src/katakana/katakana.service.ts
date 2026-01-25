import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKatakanaDto } from './dto/create-katakana.dto';
import { UpdateKatakanaDto } from './dto/update-katakana.dto';

@Injectable()
export class KatakanaService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateKatakanaDto) {
    return this.prisma.katakana.create({
      data: dto,
    });
  }

async createMany(data: CreateKatakanaDto[]) {
  try {
    // Avoid unique constraint failures by skipping symbols that already exist
    const symbols = data.map((d) => d.symbol);
    const existing = await this.prisma.katakana.findMany({
      where: { symbol: { in: symbols } },
      select: { symbol: true },
    });
    const existingSet = new Set(existing.map((e) => e.symbol));
    const toCreate = data.filter((d) => !existingSet.has(d.symbol));

    if (toCreate.length === 0) {
      return { count: 0 };
    }

    const result = await this.prisma.katakana.createMany({ data: toCreate });
    return result;
  } catch (error) {
    // Log and rethrow as BadRequest for clearer client error
    console.error('Error creating many Katakana:', error);
    throw new BadRequestException(`Failed to create many Katakana: ${error?.message ?? error}`);
  }
}


  findAll() {
    return this.prisma.katakana.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const katakana = await this.prisma.katakana.findUnique({ where: { id } });
    if (!katakana) throw new NotFoundException('Katakana not found');
    return katakana;
  }

  async update(id: string, dto: UpdateKatakanaDto) {
    await this.findOne(id);
    return this.prisma.katakana.update({
      where: { id },
      data: dto,
    });
  }

  async markAsRead(id: string) {
    await this.findOne(id);
    return this.prisma.katakana.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.katakana.delete({
      where: { id },
    });
  }
}
