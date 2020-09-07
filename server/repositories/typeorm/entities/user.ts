import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class TypeOrmUserEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string

  @Column({ type: 'varchar', name: 'encrypted_email' })
  public encryptedEmail!: string

  @Column({ type: 'varchar' })
  public salt!: string

  @Column({ type: 'varchar', name: 'password_hash' })
  public passwordHash!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date
}
