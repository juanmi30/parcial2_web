/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReseñaService {
    constructor(
        @InjectRepository(ReseñaEntity)
        private reseñaRepo: Repository<ReseñaEntity>,
    ) { }

    async agregarReseña(reseña: Partial<ReseñaEntity>) {
        return this.reseñaRepo.save(reseña);
    }
}
