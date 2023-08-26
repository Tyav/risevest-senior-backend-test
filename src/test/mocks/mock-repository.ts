import { ObjectLiteral, Repository } from 'typeorm';

export const create = jest.fn();
export const save = jest.fn();
export const findOne = jest.fn();

export const getMockRepository = <T extends ObjectLiteral>() => {
  const mockRepository: Partial<Record<keyof Repository<T>, jest.Mock>> = {
    findOne,
    save,
    create
    // Add more methods as needed
  };
  return mockRepository;
}
