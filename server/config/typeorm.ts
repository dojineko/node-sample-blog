import { createConnection } from 'typeorm'
import { TypeOrmPostEntity } from '../repositories/typeorm/entities/post'
import { TypeOrmSessionEntity } from '../repositories/typeorm/entities/session'
import { TypeOrmUserEntity } from '../repositories/typeorm/entities/user'

export const typeOrmConfig = {
  synchronize: true,
  type: 'mysql' as const,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER || 'myblog',
  password: process.env.DB_PASSWORD || 'dummy',
  database: process.env.DB_NAME || 'myblog',
  entities: [TypeOrmPostEntity, TypeOrmSessionEntity, TypeOrmUserEntity],
}

export const initTypeOrm = async () => {
  await createConnection(typeOrmConfig)
}
