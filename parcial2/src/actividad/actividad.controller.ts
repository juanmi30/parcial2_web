/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ActividadService } from './actividad.service';
import { ActividadDto } from './actividad.dto/actividad.dto';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('actividades')
@UseInterceptors(BusinessErrorsInterceptor)
export class ActividadController {
    constructor(private readonly actividadService: ActividadService) {}

    @Post()
    async create(@Body() actividadDto: ActividadDto) {
        const actividad: ActividadEntity = plainToInstance(ActividadEntity, actividadDto);
        return await this.actividadService.crearActividad(actividad);
    }

    @Get(':date')
    async findAll(@Param('date') date: string) {
        return await this.actividadService.findAllActividadesByDate(date);
    }

    @Post(':actividadId/:estado')
    async cambiarEstadoActividad(@Param('actividadId') actividadId: number, @Param('estado') estado: string) {
        return await this.actividadService.cambiarEstadoActividad(actividadId, estado);
    }
}
