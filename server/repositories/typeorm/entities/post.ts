import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { TypeOrmUserEntity } from './user'

@Entity({ name: 'posts' })
export class TypeOrmPostEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string

  @Column({ name: 'user_id', type: 'uuid' })
  public userId!: string

  @Column({ type: 'varchar' })
  public title!: string

  @Column({ type: 'text' })
  public body!: string

  @Column({ type: 'simple-array' })
  public tags!: string[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  public updatedAt!: Date | null

  @ManyToOne(() => TypeOrmUserEntity, (e) => e.id)
  @JoinColumn({ name: 'user_id' })
  user?: TypeOrmUserEntity
}
