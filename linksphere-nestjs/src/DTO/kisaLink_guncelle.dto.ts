import { PartialType } from '@nestjs/mapped-types';
import { KisaLinkOlusturDto } from './kisaLink_olustur.dto';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class KisaLinkGuncelleDto extends PartialType(KisaLinkOlusturDto) {
    @Field({ nullable: true })
    asilMetinAdi?: string;


    @Field({ nullable: true })
    kullaniciId?: string;
}
