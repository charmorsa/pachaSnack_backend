import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreEmpresa: string;
  @Column()
  email: string;
  @Column()
  telefono: string;
  @Column()
  nombreContacto: string;
  @Column({ nullable: true })
  emailContacto: string;
  @Column({ nullable: true })
  direccion: string;
}
