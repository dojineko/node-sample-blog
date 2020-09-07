import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import {
  UserLoginUsecase,
  UserLogoutUsecase,
  UserSignupUsecase,
  UserUnsubscribeUsecase,
  UserSignupUsecaseRequest,
  UserLoginUsecaseRequest,
  UserLogoutUsecaseRequest,
  UserValidateUsecase,
  UserUnsubscribeUsecaseRequest,
  UserFetchUsecase,
} from '../usecases'
import { AuthTokenPayload } from '~/interfaces'

export interface AuthControllerSignupRequest extends UserSignupUsecaseRequest {}
export interface AuthControllerLoginRequest extends UserLoginUsecaseRequest {}
export interface AuthControllerLogoutRequest extends UserLogoutUsecaseRequest {}
export interface AuthControllerUnsubscribeRequest extends UserUnsubscribeUsecaseRequest {}

@injectable()
export class AuthController {
  private loginUsecase: UserLoginUsecase
  private logoutUsecase: UserLogoutUsecase
  private signupUsecase: UserSignupUsecase
  private unsubscribeUsecase: UserUnsubscribeUsecase
  private validateUsecase: UserValidateUsecase
  private fetchUsecase: UserFetchUsecase

  public constructor(
    @inject(symbols.userLoginUsecase) loginUsecase: UserLoginUsecase,
    @inject(symbols.userLogoutUsecase) logoutUsecase: UserLogoutUsecase,
    @inject(symbols.userSignupUsecase) signupUsecase: UserSignupUsecase,
    @inject(symbols.userUnsubscribeUsecase) unsubscribeUsecase: UserUnsubscribeUsecase,
    @inject(symbols.userValidateUsecase) validateUsecase: UserValidateUsecase,
    @inject(symbols.userFetchUsecase) fetchUsecase: UserFetchUsecase,
  ) {
    this.loginUsecase = loginUsecase
    this.logoutUsecase = logoutUsecase
    this.signupUsecase = signupUsecase
    this.unsubscribeUsecase = unsubscribeUsecase
    this.validateUsecase = validateUsecase
    this.fetchUsecase = fetchUsecase
  }

  public async signup(arg: AuthControllerSignupRequest) {
    return await this.signupUsecase.execute(arg)
  }
  public async login(arg: AuthControllerLoginRequest) {
    return await this.loginUsecase.execute(arg)
  }
  public async logout(arg: AuthControllerLogoutRequest) {
    return await this.logoutUsecase.execute(arg)
  }
  public async unsubscribe(arg: AuthControllerUnsubscribeRequest) {
    return await this.unsubscribeUsecase.execute(arg)
  }
  public async fetch(token: string) {
    return await this.fetchUsecase.execute(token)
  }
  public async validate(token: string, cb: (v: AuthTokenPayload) => Promise<void>) {
    return await this.validateUsecase.execute(token, cb)
  }
}
