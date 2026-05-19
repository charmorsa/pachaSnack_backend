import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
  @Column()
  tamaño: string;
  @Column()
  id_proveedor: number;
  @Column()
  precio: number;
  @Column()
  cantidad: number;
}
