import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

@InputType() // GraphQL input type
export class KullaniciOlusturDto {
    @Field()
    @IsString()
    @Length(1, 50)
    isim: string;
    
    @Field()
    @IsString()
    @Length(1, 50)
    soyisim: string;

    @Field()
    @IsString()
    @Length(1, 50)
    nickname: string;

    @Field()
    @IsEmail()
    eposta: string;

    @Field()
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

    @Field()
    @IsEnum(["ADMIN", "KULLANICI"], { message: 'Valid role required' })
    role: "ADMIN" | "KULLANICI";
}
