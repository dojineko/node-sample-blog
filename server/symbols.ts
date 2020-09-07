export const symbols = {
  // Controllers
  authController: Symbol.for('authController'),
  postController: Symbol.for('postController'),

  // Usecases
  postCreateUsecase: Symbol.for('postCreateUsecase'),
  postDeleteUsecase: Symbol.for('postDeleteUsecase'),
  postListUsecase: Symbol.for('postListUsecase'),
  postGetUsecase: Symbol.for('postGetUsecase'),
  postUpdateUsecase: Symbol.for('postUpdateUsecase'),
  userLoginUsecase: Symbol.for('userLoginUsecase'),
  userLogoutUsecase: Symbol.for('userLogoutUsecase'),
  userSignupUsecase: Symbol.for('userSignupUsecase'),
  userUnsubscribeUsecase: Symbol.for('userUnsubscribeUsecase'),
  userFetchUsecase: Symbol.for('fetchUsecase'),

  // Repositories
  postRepository: Symbol.for('postRepository'),
  sessionRepository: Symbol.for('sessionRepository'),
  userRepository: Symbol.for('userRepository'),
  unsubscribeRepository: Symbol.for('unsubscribeRepo'),

  // Gateways
  hashGateway: Symbol.for('hashGateway'),
  jwtGateway: Symbol.for('jwtGateway'),
  secretGateway: Symbol.for('secretGateway'),
  validationGateway: Symbol.for('validationGateway'),
  userValidateUsecase: Symbol.for('userValidateUsecase'),
}
