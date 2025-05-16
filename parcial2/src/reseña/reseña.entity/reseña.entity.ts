/* eslint-disable prettier/prettier */
//1
import { ActividadEntity } from "src/actividad/actividad.entity/actividad.entity";
import { EstudianteEntity } from "src/estudiante/estudiante.entity/estudiante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReseñaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fecha: string;

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.reseñas)
    estudiante: EstudianteEntity;

    @ManyToOne(() => ActividadEntity, (actividad) => actividad.reseñas)
    actividad: ActividadEntity;

}
