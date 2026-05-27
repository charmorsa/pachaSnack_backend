import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', nullable: true })
  pin: number;

  @Column({ nullable: true })
  id_device: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  notifPush: string;
}
