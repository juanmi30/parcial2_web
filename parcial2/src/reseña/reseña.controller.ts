/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ReseñaDto } from './reseña.dto/reseña.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { plainToInstance } from 'class-transformer';
import { ReseñaService } from './reseña.service';

@Controller('reseñas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReseñaController {
    constructor(private readonly reseñaService: ReseñaService) {}
    
    @Post()
    async agregarReseña(@Body() reseñaDto: ReseñaDto) {
        const reseña: ReseñaEntity = plainToInstance(ReseñaEntity, reseñaDto);
        return await this.reseñaService.agregarReseña(reseña);
    }
}
