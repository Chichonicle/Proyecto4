import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"




@Entity("worker")
export class worker extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  user_name!: string

  @Column()
  user_id!:number

  @Column()
  email!: string

  @Column()
  password!: string
  
  @Column()
  role!: string
  
  @Column()
  licenseNumber!: string
  
  @Column()
  created_at!: Date
  
  @Column()
  updated_at!: Date

  



}
