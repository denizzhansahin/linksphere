// filepath: c:\Users\densh\OneDrive\Masaüstü\LinkKisaltma\link-card\src\DTO\kisaLink_olustur.dto.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class KisaLinkOlusturDto {
    @Field()
    @IsString()
    @Length(1, 1000)
    asilMetinAdi: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsUUID()
    kullaniciId?: string;
}