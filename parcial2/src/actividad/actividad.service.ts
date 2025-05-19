/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ActividadService {
    constructor(
        @InjectRepository(ActividadEntity)
        private actividadRepository: Repository<ActividadEntity>,
    ) { }

    async crearActividad(actividad: Partial<ActividadEntity>) {
        if (actividad.titulo === undefined || actividad.titulo.length < 15) {
            throw new BusinessLogicException('El título debe estar definido y tener al menos 15 caracteres', BusinessError.PRECONDITION_FAILED);   
        }
        return this.actividadRepository.save(actividad);
    }

    async findAllActividadesByDate(date: string) {
        const actividades = await this.actividadRepository.find({ where: { fecha: date } });
        if (actividades.length === 0) {
            throw new BusinessLogicException('No hay actividades para la fecha proporcionada', BusinessError.NOT_FOUND);
        }
        return actividades;
    }

    async cambiarEstadoActividad(id: number, estado: string) {
        const actividad = await this.actividadRepository.findOne({ where: { id } });
        if (!actividad) {
            throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);
        }
        actividad.estado = estado;
        return this.actividadRepository.save(actividad);
    }
}
