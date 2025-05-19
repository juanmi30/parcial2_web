import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('ActividadService', () => {
  let service: ActividadService;
  let repository: Repository<ActividadEntity>;
  let actividadesList: ActividadEntity[];

  const seedDatabase = async () => {
    await repository.clear();
    actividadesList = [];
    for (let i = 0; i < 3; i++) {
      const actividad = await repository.save({
        titulo: faker.lorem.sentence(5),
        fecha: '2025-05-19',
        cupoMaximo: faker.number.int({ min: 5, max: 30 }),
        estado: '0',
      });
      actividadesList.push(actividad);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ActividadService],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repository = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearActividad should create valid actividad', async () => {
    const actividad = {
      titulo: 'Actividad voluntariado ambiental',
      fecha: '2025-06-01',
      cupoMaximo: 20,
      estado: '0',
    };

    const nueva = await service.crearActividad(actividad);
    expect(nueva).not.toBeNull();

    const stored = await repository.findOneBy({ id: nueva.id });
    expect(stored).not.toBeNull();
    expect(stored!.titulo).toEqual(actividad.titulo);
  });

  it('crearActividad should throw exception if titulo is too short', async () => {
    const actividad = {
      titulo: 'Muy corta',
      fecha: '2025-06-01',
      cupoMaximo: 10,
      estado: '0',
    };

    await expect(service.crearActividad(actividad)).rejects.toHaveProperty(
      'message',
      'El título debe estar definido y tener al menos 15 caracteres',
    );
  });

  it('findAllActividadesByDate should return actividades for a date', async () => {
    const result = await service.findAllActividadesByDate('2025-05-19');
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
  });

  it('findAllActividadesByDate should throw if no actividades found', async () => {
    await expect(service.findAllActividadesByDate('1999-01-01')).rejects.toHaveProperty(
      'message',
      'No hay actividades para la fecha proporcionada',
    );
  });

  it('cambiarEstadoActividad should update estado correctly', async () => {
    const actividad = actividadesList[0];
    const updated = await service.cambiarEstadoActividad(actividad.id, '1');

    expect(updated).not.toBeNull();
    expect(updated.estado).toBe('1');
  });

  it('cambiarEstadoActividad should throw exception if actividad not found', async () => {
    await expect(service.cambiarEstadoActividad(9999, '1')).rejects.toHaveProperty(
      'message',
      'Actividad no encontrada',
    );
  });
});
