import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ChildrenService {
    constructor(private prismaService: PrismaService) { }
    async create(createChildDto: CreateChildDto) {
        try
        {
            return await this.prismaService.children.create({
                data: {
                    ...createChildDto,
                },
            });
        }
        catch (error) {
            throw new HttpErrorByCode[400]("Bad request");
        }
    }

    async addToy(id: number, toyId: number) {
        try
        {
            return await this.prismaService.children.update({
                include: {
                    toys: true,
                },
                where: {
                    id,
                    well_behaved: true
                },
                data: {
                    toys: {
                        connect: {
                            id: toyId,
                        },
                    },
                },
            });
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    throw new HttpErrorByCode[404]("Not found");
                case 'P2016':
                    throw new HttpErrorByCode[400]("Can't add toy to a bad behaving child or the child dosen't exist")
                default:
                    throw new HttpErrorByCode[400]("Bad request");
            }
        }
    }

    async findAll() {
        return await this.prismaService.children.findMany({
            include: {
                toys: true,
            },
        });
    }

    async findOne(id: number) {
        try {
            return await this.prismaService.children.findUniqueOrThrow({
                include: {
                    toys: true,
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

    async update(id: number, updateChildDto: UpdateChildDto) {
        try
        {
            return await this.prismaService.children.update({
                where: {
                    id,
                },
                data: {
                    ...updateChildDto,
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
            return await this.prismaService.children.delete({
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

    async removeToy(id: number, toyId: number) {
        try
        {
            return await this.prismaService.children.update({
                include: {
                    toys: true,
                },
                where: {
                    id,
                },
                data: {
                    toys: {
                        disconnect: {
                            id: toyId
                        }
                    }
                }
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
