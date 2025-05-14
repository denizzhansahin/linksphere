import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KullaniciModule } from './kullanici/kullanici.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kullanici } from './Entities/kullanici.entity';
import { KisiselLink } from './Entities/kisiselLink.entity';
import { KurumsalLink } from './Entities/kurumsalLink.entity';
import { Link } from './Entities/kisalink.entity';
import { KullaniciGraphQl } from './GraphQl/KullaniciQuery';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { LinkIslemlerModule } from './link_islemler/link_islemler.module';
import { LinkIslemlerGraphQl } from './GraphQl/LinkIslemlerQuery';
import { LinkIslemlerService } from './link_islemler/link_islemler.service';

// filepath: src/app.module.ts
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      synchronize: true,
      entities: [Kullanici, KisiselLink, KurumsalLink, Link], // Ensure Link is included here
    }),
    KullaniciModule,
    LinkIslemlerModule, // Ensure this module is imported
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
