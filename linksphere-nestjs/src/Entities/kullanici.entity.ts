import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Link } from './kisalink.entity';
import { KisiselLink } from './kisiselLink.entity';
import { KurumsalLink } from './kurumsalLink.entity';

import * as bcrypt from 'bcrypt';

@ObjectType() // GraphQL için
@Entity('kullanici') // TypeORM için
export class Kullanici {
    @Field() // GraphQL alanı
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @Field()
    nickname: string

    @Field()
    @Column({ length: 50 })
    isim: string;

    @Field()
    @Column({ length: 50 })
    soyisim: string;

    @Field()
    @Column({ unique: true })
    eposta: string;

    @Field()
    @Column()
    sifre: string;

    @Field()
    @CreateDateColumn() // Otomatik oluşturma tarihi
    olusturmaTarihi: Date;

    @Field({ nullable: true })
    @DeleteDateColumn({ nullable: true }) // Silme tarihi (soft delete için)
    silmeTarihi?: Date;

    @Field()
    @UpdateDateColumn() // Otomatik güncelleme tarihi
    guncellemeTarihi: Date;

    @Field({ nullable: true })
    @Column({ length: 50, nullable: true })
    ulke?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    fotograf?: string;

    @Field(() => [Link], { nullable: true }) // GraphQL için
    @OneToMany(() => Link, (link) => link.kullanici) // TypeORM ilişki
    linkler?: Link[];

    @Field(() => KisiselLink, { nullable: true }) // GraphQL için
    @OneToOne(() => KisiselLink, { nullable: true }) // TypeORM ilişki
    @JoinColumn() // İlişkiyi belirten sütun
    kisiselLink?: KisiselLink;

    @Field(() => KurumsalLink, { nullable: true }) // GraphQL için
    @OneToOne(() => KurumsalLink, { nullable: true }) // TypeORM ilişki
    @JoinColumn() // İlişkiyi belirten sütun
    kurumsalLink?: KurumsalLink;

    @Field({ nullable: true })
    @Column({ nullable: true })
    role?: string; // Kullanıcının rolü (admin, user vb.)

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.sifre && this.sifre.length < 60) {
            this.sifre = await bcrypt.hash(this.sifre, 10);
        }
    }
}