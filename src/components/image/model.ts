import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { OrphanageModel } from "../orphanage";

@Entity("image")
export default class ImageModel {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  path!: string;

  @ManyToOne(() => OrphanageModel, (orphanage) => orphanage.images)
  @JoinColumn({ name: "orphanage_id" })
  orphanageKeyForeign!: OrphanageModel;
}
