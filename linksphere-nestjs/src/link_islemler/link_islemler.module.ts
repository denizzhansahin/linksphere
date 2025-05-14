import { Module } from '@nestjs/common';
import { LinkIslemlerService } from './link_islemler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from 'src/Entities/kullanici.entity';
import { KisiselLink } from 'src/Entities/kisiselLink.entity';
import { KurumsalLink } from 'src/Entities/kurumsalLink.entity';
import { Link } from 'src/Entities/kisalink.entity';
import { LinkIslemlerGraphQl } from 'src/GraphQl/LinkIslemlerQuery';

@Module({
  providers: [LinkIslemlerService, LinkIslemlerGraphQl],
  imports: [
    TypeOrmModule.forFeature([Kullanici, KisiselLink, KurumsalLink, Link]), // Ensure Link is included here
  ],
})
export class LinkIslemlerModule {}
