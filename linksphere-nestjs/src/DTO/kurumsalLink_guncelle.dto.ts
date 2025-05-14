import { PartialType } from '@nestjs/mapped-types';
import { KurumsalLinkOlusturDto } from './kurumsalLink_olustur.dto';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class KurumsalLinkGuncelleDto extends PartialType(KurumsalLinkOlusturDto) {
    @Field({ nullable: true })
    isEpostasi?: string;

    @Field({ nullable: true })
    isWebSitesi?: string;

    @Field({ nullable: true })
    isyeriWebSitesi?: string;

    @Field({ nullable: true })
    isYeriAdresi?: string;

    @Field({ nullable: true })
    isTelefonu?: string;

    @Field({ nullable: true })
    isYeriTelefon?: string;

    @Field({ nullable: true })
    isYeriEposta?: string;

    @Field({ nullable: true })
    isyeriTwitter?: string;

    @Field({ nullable: true })
    isyeriLinkedin?: string;

    @Field({ nullable: true })
    isyeriUrunKatalogu?: string;

    @Field({ nullable: true })
    isyeriBasinKiti?: string;

    @Field({ nullable: true })
    isyeriKariyerler?: string;

    @Field({ nullable: true })
    isyeriAdi?: string;
}
