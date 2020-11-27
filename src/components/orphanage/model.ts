import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { ImageModel } from "../image";

@Entity("orphanage")
export default class OrphanageModel {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  name!: string;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  about!: string;

  @Column()
  instructions!: string;

  @Column({
    name: "opening_hours",
  })
  openingHours!: string;

  @Column({
    name: "open_on_weekends",
    default: false,
  })
  openOnWeekends!: boolean;

  @OneToMany(() => ImageModel, (image) => image.orphanageKeyForeign, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images?: ImageModel[];
}
