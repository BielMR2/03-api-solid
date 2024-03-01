import { PrismaCreckInsRepository } from './../../repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCreckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
