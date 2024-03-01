import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Title Gym 1',
        description: 'Some description.',
        phone: '11999999999',
        latitude: -28.475842,
        longitude: -49.0110976,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Title Gym 2',
        description: 'Some description.',
        phone: '11999999999',
        latitude: 1.475842,
        longitude: 1.0110976,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -28.475842,
        longitude: -49.0110976,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Title Gym 1',
      }),
    ])
  })
})
