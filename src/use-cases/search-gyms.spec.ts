import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let GymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(GymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await GymsRepository.create({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -28.475842,
      longitude: -49.0110976,
    })

    await GymsRepository.create({
      title: 'gym-02',
      description: null,
      phone: null,
      latitude: -28.475842,
      longitude: -49.0110976,
    })

    const { gyms } = await sut.execute({
      query: '01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-01' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        title: `gym-${i}`,
        description: null,
        phone: null,
        latitude: -28.475842,
        longitude: -49.0110976,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-21' }),
      expect.objectContaining({ title: 'gym-22' }),
    ])
  })
})
