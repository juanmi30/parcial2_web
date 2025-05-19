/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from '../../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { ReseñaEntity } from '../../reseña/reseña.entity/reseña.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, ReseñaEntity, ActividadEntity],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([EstudianteEntity, ReseñaEntity, ActividadEntity]),
];