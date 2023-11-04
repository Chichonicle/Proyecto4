import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { worker } from "./worker";



@Entity("proyects")
export class Proyects extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    proyectName!:string;

    @Column()
    worker_id!: number;

    @Column()
    tattooname!: string;

    @Column()
    tattoo_url!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;

    @ManyToOne(() => worker, (worker) => worker.proyects)
  @JoinColumn({ name: "worker_id"})
  worker!: worker;
}