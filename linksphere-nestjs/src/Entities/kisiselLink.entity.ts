import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Kullanici } from './kullanici.entity';

@ObjectType() // GraphQL için
@Entity('kisisel_linkler') // TypeORM için
export class KisiselLink {
  @Field() // GraphQL alanı
  @PrimaryGeneratedColumn() // UUID tipi birincil anahtar
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  x?: string; // Eski adıyla Twitter

  @Field({ nullable: true })
  @Column({ nullable: true })
  spotify?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  youtube?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  linkedin?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reddit?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  vk?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  medium?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  webSite?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  favoriMuzikVideom?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  youtubeList?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  youtubeVideo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  blogSitem?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  spotifyList?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  alisverisListem?: string;

  @OneToOne(() => Kullanici, (kullanici) => kullanici.kisiselLink, { nullable: true }) // TypeORM ilişki
  kullanici?: Kullanici;
}