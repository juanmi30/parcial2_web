/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
} from 'typeorm';

import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';
import { ActividadEntity } from '../../actividad/actividad.entity/actividad.entity';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    programa: string;

    @Column()
    semestre: number;

    @OneToMany(() => ReseñaEntity, (reseña) => reseña.estudiante)
    reseñas: ReseñaEntity[];

    @ManyToMany(() => ActividadEntity, (actividad) => actividad.estudiantes)
    actividades: ActividadEntity[];
}
