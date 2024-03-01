import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let GymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(GymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await GymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -28.475842,
      longitude: -49.0110976,
    })

    await GymsRepository.create({
      title: 'Dar Gym',
      description: null,
      phone: null,
      latitude: 1.475842,
      longitude: 1.0110976,
    })

    const { gyms } = await sut.execute({
      userLatitude: -28.475842,
      userLongitude: -49.0110976,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
