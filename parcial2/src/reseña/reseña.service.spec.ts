/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReseñaService } from './reseña.service';
import { ReseñaEntity } from './reseña.entity/reseña.entity';
import { DeepPartial, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReseñaService', () => {
  let service: ReseñaService;
  let repository: Repository<ReseñaEntity>;
  let reseñasList: ReseñaEntity[];

  const seedDataBase = async () => {
    await repository.clear();
    reseñasList = [];
    for (let i = 0; i < 5; i++) {
      const reseña = await repository.save({
        comentario: faker.lorem.sentence(),
        calificacion: faker.number.int({ min: 1, max: 5 }),
        fecha: faker.date.recent().toISOString(),
      });
      reseñasList.push(reseña);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReseñaService],
    }).compile();

    service = module.get<ReseñaService>(ReseñaService);
    repository = module.get<Repository<ReseñaEntity>>(getRepositoryToken(ReseñaEntity));
    await seedDataBase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a reseña', async () => {
    const reseña: DeepPartial<ReseñaEntity> = {
      comentario: faker.lorem.sentence(),
      calificacion: 5,
      fecha: faker.date.recent().toISOString(),
    };

    const newReseña = await service.agregarReseña(reseña as ReseñaEntity);
    expect(newReseña).not.toBeNull();

    const storedReseña = await repository.findOneBy({ id: newReseña.id });
    expect(storedReseña).not.toBeNull();
    expect(storedReseña!.comentario).toEqual(reseña.comentario);
    expect(storedReseña!.calificacion).toEqual(reseña.calificacion);
    expect(storedReseña!.fecha).toEqual(reseña.fecha);
  });
});
