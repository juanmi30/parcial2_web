/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActividadService {
    constructor(
        @InjectRepository(ActividadEntity)
        private actividadRepository: Repository<ActividadEntity>,
    ) { }

    async crearActividad(actividad: Partial<ActividadEntity>) {
        if (actividad.titulo === undefined || actividad.titulo.length < 15) {
            throw new BadRequestException('El título debe estar definido y tener al menos 15 caracteres');
            return this.actividadRepository.save(actividad);
        }
    }

    async findAllActividadesByDate(date: string) {
        const actividades = await this.actividadRepository.find({ where: { fecha: date } });
        if (actividades.length === 0) {
            throw new BadRequestException('No hay actividades para la fecha proporcionada');
        }
        return actividades;
    }

    async cambiarEstadoActividad(id: number, estado: string) {
        const actividad = await this.actividadRepository.findOne({ where: { id } });
        if (!actividad) {
            throw new BadRequestException('Actividad no encontrada');
        }
        actividad.estado = estado;
        return this.actividadRepository.save(actividad);
    }
}
