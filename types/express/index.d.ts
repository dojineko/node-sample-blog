declare namespace Express {
  interface Request {
    context: {
      userId: string
      sessionId: string
    }
    cookies: {
      auth_token: string
    }
  }
}
