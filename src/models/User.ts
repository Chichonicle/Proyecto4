import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./appointments";
import { worker } from "./worker";


@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!:string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    is_active!: boolean;

    @Column()
    role!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.userAppointment)
    userAppointments!: Appointment[];
  
    @ManyToMany(() => worker)
    @JoinTable({
      name: "appointments",
      joinColumn: {
        name: "client",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "worker",
        referencedColumnName: "id",
      },
    })
    Userworker!: worker[];
   
}