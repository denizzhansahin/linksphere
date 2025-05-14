import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType() // GraphQL input type
export class KisiselLinkOlusturDto {
    @Field() // Kişisel link her zaman bir kullanıcıya ait olmalı
    @IsNotEmpty()
    @IsUUID()
    kullaniciId: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    instagram?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    facebook?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    x?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    spotify?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    youtube?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    linkedin?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    reddit?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    vk?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    medium?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    webSite?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    favoriMuzikVideom?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    youtubeList?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    youtubeVideo?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    blogSitem?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    spotifyList?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    alisverisListem?: string;
}
