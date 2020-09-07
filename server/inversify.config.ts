import { Container } from 'inversify'
import { symbols as s } from './symbols'
import * as c from './controllers'
import * as g from './gateways'
import * as u from './usecases'
import * as r from './repositories'

export const container = new Container()

// Controllers
container.bind(s.authController).to(c.AuthController)
container.bind(s.postController).to(c.PostController)

// Usecases
container.bind(s.postCreateUsecase).to(u.PostCreateUsecase)
container.bind(s.postDeleteUsecase).to(u.PostDeleteUsecase)
container.bind(s.postListUsecase).to(u.PostListUsecase)
container.bind(s.postGetUsecase).to(u.PostGetUsecase)
container.bind(s.postUpdateUsecase).to(u.PostUpdateUsecase)
container.bind(s.userLoginUsecase).to(u.UserLoginUsecase)
container.bind(s.userLogoutUsecase).to(u.UserLogoutUsecase)
container.bind(s.userSignupUsecase).to(u.UserSignupUsecase)
container.bind(s.userUnsubscribeUsecase).to(u.UserUnsubscribeUsecase)
container.bind(s.userValidateUsecase).to(u.UserValidateUsecase)
container.bind(s.userFetchUsecase).to(u.UserFetchUsecase)

// Repositories
container.bind(s.postRepository).to(r.TypeOrmPostRepository)
container.bind(s.sessionRepository).to(r.TypeOrmSessionRepository)
container.bind(s.userRepository).to(r.TypeOrmUserRepository)
container.bind(s.unsubscribeRepository).to(r.TypeOrmUnsubscribeRepository)

// Gateways
container.bind(s.jwtGateway).to(g.JwtSimpleJwtGateway)
container.bind(s.hashGateway).to(g.CryptoHashGateway)
container.bind(s.secretGateway).to(g.CryptoSecretGateway)
container.bind(s.validationGateway).to(g.ValidatorValidationGateway)
