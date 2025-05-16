import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ReseñaModule } from './reseña/reseña.module';
import { ActividadModule } from './actividad/actividad.module';

@Module({
  imports: [EstudianteModule, ReseñaModule, ActividadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
