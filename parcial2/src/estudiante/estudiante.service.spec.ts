import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from '../shared/errors/business-errors';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  const seedDatabase = async () => {
    await repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante = await repository.save({
        cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
        nombre: faker.person.fullName(),
        correo: faker.internet.email(),
        programa: faker.word.words(1),
        semestre: faker.number.int({ min: 1, max: 10 }),
      });
      estudiantesList.push(estudiante);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante should create a valid estudiante', async () => {
    const estudiante = {
      cedula: faker.number.int({ min: 1000000000, max: 9999999999 }),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.word.words(1),
      semestre: 5,
    };

    const newEstudiante = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante = await repository.findOneBy({ id: newEstudiante.id });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante!.nombre).toEqual(estudiante.nombre);
    expect(storedEstudiante!.semestre).toEqual(estudiante.semestre);
  });

  it('crearEstudiante should throw exception for invalid semestre', async () => {
    const estudiante = {
      cedula: faker.number.int(),
      nombre: faker.person.fullName(),
      correo: faker.internet.email(),
      programa: faker.word.words(1),
      semestre: 0,
    };

    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty(
  'message',
  'El semestre debe estar definido y estar entre 1 y 10',
);
  });

  it('findEstudianteById should return a estudiante by id', async () => {
    const storedEstudiante = estudiantesList[0];
    const estudiante = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.id).toEqual(storedEstudiante.id);
  });

  it('findEstudianteById should throw exception if not found', async () => {
    await expect(service.findEstudianteById(999)).rejects.toHaveProperty(
  'message',
  'Estudiante no encontrado',
);
  });
});
