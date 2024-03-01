import { PrismaCreckInsRepository } from './../../repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCreckInsRepository()
  const useCase = new GetUserMetricUseCase(checkInsRepository)

  return useCase
}
