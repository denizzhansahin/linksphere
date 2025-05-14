import { PartialType } from '@nestjs/mapped-types';
import { KisiselLinkOlusturDto } from './kisiselLink_olustur.dto';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class KisiselLinkGuncelleDto extends PartialType(KisiselLinkOlusturDto) {
    @Field({ nullable: true })
    instagram?: string;

    @Field({ nullable: true })
    facebook?: string;

    @Field({ nullable: true })
    x?: string;

    @Field({ nullable: true })
    spotify?: string;

    @Field({ nullable: true })
    youtube?: string;

    @Field({ nullable: true })
    linkedin?: string;

    @Field({ nullable: true })
    reddit?: string;

    @Field({ nullable: true })
    vk?: string;

    @Field({ nullable: true })
    medium?: string;

    @Field({ nullable: true })
    webSite?: string;

    @Field({ nullable: true })
    favoriMuzikVideom?: string;

    @Field({ nullable: true })
    youtubeList?: string;

    @Field({ nullable: true })
    youtubeVideo?: string;

    @Field({ nullable: true })
    blogSitem?: string;

    @Field({ nullable: true })
    spotifyList?: string;

    @Field({ nullable: true })
    alisverisListem?: string;
}
