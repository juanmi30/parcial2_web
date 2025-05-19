/* eslint-disable prettier/prettier */
import { Controller, Get, UseInterceptors, Param, Post, Body } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.estudianteService.findEstudianteById(id);
    }

    @Post()
    async create(@Body() estudianteDto: EstudianteDto) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Post(':estudianteId/:actividadId')
    async inscribirseActividad(@Param('estudianteId') estudianteId: number, @Param('actividadId') actividadId: number) {
        return await this.estudianteService.inscribirseActividad(estudianteId, actividadId);
    }
}
