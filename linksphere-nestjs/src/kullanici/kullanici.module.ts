import { Module } from '@nestjs/common';
import { KullaniciService } from './kullanici.service';
import { KullaniciGraphQl } from 'src/GraphQl/KullaniciQuery';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from 'src/Entities/kullanici.entity';
import { KisiselLink } from 'src/Entities/kisiselLink.entity';
import { KurumsalLink } from 'src/Entities/kurumsalLink.entity';
import { Link } from 'src/Entities/kisalink.entity';

@Module({
  providers: [KullaniciService,KullaniciGraphQl],
  exports: [KullaniciService], 
  imports:[
    TypeOrmModule.forFeature([Kullanici,KisiselLink,KurumsalLink,Link]),
  ]
})
export class KullaniciModule {}
