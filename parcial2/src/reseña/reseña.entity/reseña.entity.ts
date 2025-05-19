/* eslint-disable prettier/prettier */
import { ActividadEntity } from "../../actividad/actividad.entity/actividad.entity";
import { EstudianteEntity } from "../../estudiante/estudiante.entity/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReseñaEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comentario: string;

    @Column()
    calificacion: number;

    @Column()
    fecha: string;

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.reseñas, {nullable: true})
    @JoinColumn()
    estudiante?: EstudianteEntity;

    @ManyToOne(() => ActividadEntity, (actividad) => actividad.reseñas, {nullable: true})
    @JoinColumn()
    actividad?: ActividadEntity;

}
