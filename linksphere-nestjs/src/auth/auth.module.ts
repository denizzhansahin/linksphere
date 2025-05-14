import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Kullanici } from 'src/Entities/kullanici.entity';
import { KullaniciService } from 'src/kullanici/kullanici.service';
import { LinkIslemlerService } from 'src/link_islemler/link_islemler.service';
import { KisiselLink } from 'src/Entities/kisiselLink.entity';
import { KurumsalLink } from 'src/Entities/kurumsalLink.entity';
import { Link } from 'src/Entities/kisalink.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([Kullanici,KisiselLink,KurumsalLink,Link]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, KullaniciService,LinkIslemlerService],
  controllers: [AuthController],
})
export class AuthModule {}