/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ReseñaModule } from './reseña/reseña.module';
import { ActividadModule } from './actividad/actividad.module';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ReseñaEntity } from './reseña/reseña.entity/reseña.entity';
import { ActividadEntity } from './actividad/actividad.entity/actividad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EstudianteModule, 
    ReseñaModule, 
    ActividadModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [EstudianteEntity, ReseñaEntity, ActividadEntity],
      dropSchema: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
