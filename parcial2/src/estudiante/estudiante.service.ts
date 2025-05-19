/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private estudianteRepository: Repository<EstudianteEntity>,
        @InjectRepository(ActividadEntity)
        private actividadRepository: Repository<ActividadEntity>,
    ) { }

    async crearEstudiante(estudiante: Partial<EstudianteEntity>) {
        if (estudiante.semestre === undefined || estudiante.semestre < 1 || estudiante.semestre > 10) {
            throw new BusinessLogicException('El semestre debe estar definido y estar entre 1 y 10', BusinessError.PRECONDITION_FAILED);
        }
        return this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: number) {
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante) throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        return estudiante;
    }

    async inscribirseActividad(estudianteId: number, actividadId: number) {
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId } });
        if (!estudiante) throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);

        const actividad = await this.actividadRepository.findOne({ where: { id: actividadId } });
        if (!actividad) throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);

        if (actividad.estado !== '0') {
            throw new BusinessLogicException('La actividad no está abierta para inscripciones', BusinessError.PRECONDITION_FAILED);
        }

        if (estudiante.actividades.find(act => act.id === actividadId)) {
            throw new BusinessLogicException('El estudiante ya está inscrito en esta actividad', BusinessError.PRECONDITION_FAILED);
        }

        return this.estudianteRepository.save(estudiante);
    }
}
