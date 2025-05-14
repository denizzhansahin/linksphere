import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Kullanici } from './kullanici.entity';

@ObjectType() // GraphQL output type
@Entity('kurumsal_linkler')
export class KurumsalLink {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isEpostasi: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isWebSitesi: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriWebSitesi: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isYeriAdresi: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isTelefonu: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isYeriTelefon: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isYeriEposta: string;

    @Field(() => Kullanici, { nullable: true }) // GraphQL relation
    @OneToOne(() => Kullanici, (kullanici) => kullanici.kurumsalLink, { nullable: true }) // TypeORM relation
    kullanici?: Kullanici;

    @Field()
    @CreateDateColumn()
    olusturmaTarihi: Date;

    @Field()
    @UpdateDateColumn()
    guncellemeTarihi: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriLinkedin: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriTwitter: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriUrunKatalogu: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriBasinKiti: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriKariyerler: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isyeriAdi: string;
}
