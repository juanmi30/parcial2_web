/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity/actividad.entity';

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
            throw new BadRequestException('El semestre debe estar definido y estar entre 1 y 10');
        }
        return this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: number) {
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
        return estudiante;
    }

    async inscribirseActividad(estudianteId: number, actividadId: number) {
        const estudiante = await this.estudianteRepository.findOne({ where: { id: estudianteId } });
        if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

        const actividad = await this.actividadRepository.findOne({ where: { id: actividadId } });
        if (!actividad) throw new NotFoundException('Actividad no encontrada');

        if (actividad.estado !== '0') {
            throw new BadRequestException('La actividad no está abierta para inscripciones');
        }

        if (estudiante.actividades.find(act => act.id === actividadId)) {
            throw new BadRequestException('El estudiante ya está inscrito en esta actividad');
        }

        return this.estudianteRepository.save(estudiante);
    }
}
