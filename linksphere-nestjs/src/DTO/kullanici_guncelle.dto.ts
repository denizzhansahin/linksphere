import { Field, InputType, PartialType } from '@nestjs/graphql';
import { KullaniciOlusturDto } from './kullanici_olustur.dto';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

@InputType() // GraphQL input type
export class KullaniciGuncelleDto extends PartialType(KullaniciOlusturDto) {
    @Field({ nullable: true })
    @IsString()
    @Length(1, 50)
    isim: string;

    @Field({ nullable: true })
    @IsString()
    @Length(1, 50)
    soyisim: string;

    @Field({ nullable: true })
    @IsString()
    @Length(1, 50)
    nickname: string

    @Field({ nullable: true })
    @IsEmail()
    eposta: string;

    @Field({ nullable: true })
    @IsString()
    sifre: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    ulke?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    fotograf?: string;

    @Field({ nullable: true })
    @IsEnum(["ADMIN" , "KULLANICI" ],
        {message : 'Valid role required'}
    )
    role : "ADMIN" | "KULLANICI"
}
