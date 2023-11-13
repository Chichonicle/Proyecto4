import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Appointment } from "./appointments"
import { Proyects } from "./Proyects"




@Entity("worker")
export class worker extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

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

  @OneToMany(() => Appointment, (appointment)=>appointment.workerAppointment)
  workerAppointments!:Appointment[];

  @OneToMany(() => Proyects, (proyects) => proyects.worker)
  proyects!: Proyects[];

  @ManyToMany(() => User)
  @JoinTable({
     name: "appointments",
     joinColumn: {
        name: "worker",
        referencedColumnName: "id",
     },
     inverseJoinColumn: {
        name: "client",
        referencedColumnName: "id",
     },
})
workerusers!:User[]



}
