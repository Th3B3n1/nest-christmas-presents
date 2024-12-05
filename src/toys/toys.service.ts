import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ToysService {
    constructor(private prismaService: PrismaService) { }
    async create(createToyDto: CreateToyDto) {
        try
        {
            return await this.prismaService.toys.create({
                data: {
                    ...createToyDto,
                },
            });
        }
        catch (error) {
            throw new HttpErrorByCode[400]("Bad request");
        }
    }

    async findAll() {
        return await this.prismaService.toys.findMany({
            include: {
                children: true,
            },
        });
    }

    async findOne(id: number) {
        try {
            return await this.prismaService.toys.findUniqueOrThrow({
                include: {
                    children: true,
                },
                where: {
                    id,
                },
            });
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    throw new HttpErrorByCode[404]("Not found");
                default:
                    throw new HttpErrorByCode[400]("Bad request");
            }
        }
    }

    async update(id: number, updateToyDto: UpdateToyDto) {
        try
        {
            return await this.prismaService.toys.update({
                where: {
                    id,
                },
                data: {
                    ...updateToyDto,
                },
            });
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    throw new HttpErrorByCode[404]("Not found");
                default:
                    throw new HttpErrorByCode[400]("Bad request");
            }
        }
    }

    async remove(id: number) {
        try
        {
            return await this.prismaService.toys.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    throw new HttpErrorByCode[404]("Not found");
                default:
                    throw new HttpErrorByCode[400]("Bad request");
            }
        }
    }
}
