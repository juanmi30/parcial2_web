/* eslint-disable prettier/prettier */
import { EstudianteEntity } from "src/estudiante/estudiante.entity/estudiante.entity";
import { ReseñaEntity } from "src/reseña/reseña.entity/reseña.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActividadEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    fecha: string;

    @Column()
    cupoMaximo: number;

    @Column()
    estado: string;

    @ManyToMany(() => EstudianteEntity, (estudiante) => estudiante.actividades)
    estudiantes: EstudianteEntity[];

    @OneToMany(() => ReseñaEntity, (reseña) => reseña.actividad)
    reseñas: ReseñaEntity[];

}
