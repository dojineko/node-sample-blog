import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { TypeOrmUserEntity } from './user'

@Entity({ name: 'sessions' })
export class TypeOrmSessionEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string

  @Column({ name: 'user_id', type: 'uuid' })
  public userId!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date

  @ManyToOne(() => TypeOrmUserEntity, (e) => e.id)
  @JoinColumn({ name: 'user_id' })
  user?: TypeOrmUserEntity
}
