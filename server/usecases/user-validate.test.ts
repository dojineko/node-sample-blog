import { symbols } from '../symbols'
import { container } from '../inversify.config'
import { UserValidateUsecase } from './user-validate'
import { Forbidden } from '../utils/errors'
import { JwtSimpleJwtGateway } from '../gateways'
import { TypeOrmSessionRepository } from '../repositories'

const usecase = container.get<UserValidateUsecase>(symbols.userValidateUsecase)

describe('UserValidationUsecase', () => {
  describe('execute', () => {
    test(`success`, async () => {
      jest.spyOn(JwtSimpleJwtGateway.prototype, 'decode').mockResolvedValue({ userId: 'dummy' } as any)
      jest.spyOn(TypeOrmSessionRepository.prototype, 'findById').mockResolvedValue({ userId: 'dummy' } as any)
      await expect(usecase.execute('', async () => {})).resolves.not.toThrow()
    })
    test(`throws Forbidden('session not found')`, async () => {
      jest.spyOn(JwtSimpleJwtGateway.prototype, 'decode').mockResolvedValue({ userId: 'dummy' } as any)
      jest.spyOn(TypeOrmSessionRepository.prototype, 'findById').mockResolvedValue(null)
      await expect(usecase.execute('', async () => {})).rejects.toThrowError(new Forbidden('session not found'))
    })
    test(`throws Forbidden('session invalid')`, async () => {
      jest.spyOn(JwtSimpleJwtGateway.prototype, 'decode').mockResolvedValue({ userId: 'dummy1' } as any)
      jest.spyOn(TypeOrmSessionRepository.prototype, 'findById').mockResolvedValue({ userId: 'dummy2' } as any)
      await expect(usecase.execute('', async () => {})).rejects.toThrowError(new Forbidden('session invalid'))
    })
  })
})
