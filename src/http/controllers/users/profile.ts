import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const gerUserProfile = makeGetUserProfileUseCase()

  const { user } = await gerUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
