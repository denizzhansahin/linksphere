import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType() // GraphQL input type
export class KurumsalLinkOlusturDto {
    @Field() // Kurumsal link her zaman bir kullanıcıya ait olmalı
    @IsNotEmpty()
    @IsUUID()
    kullaniciId: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isEpostasi?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isWebSitesi?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriWebSitesi?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isYeriAdresi?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isTelefonu?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isYeriTelefon?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isYeriEposta?: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriLinkedin?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriTwitter?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriUrunKatalogu?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriBasinKiti?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriKariyerler?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    isyeriAdi?: string;
}
