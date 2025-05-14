import { Resolver, Mutation, Args, Float, Context, Query } from '@nestjs/graphql'; // Float'ı ekledim
import { Link } from '../Entities/kisalink.entity'; // path'i kendi yapınıza göre düzeltin
import { KisiselLink } from '../Entities/kisiselLink.entity'; // path'i kendi yapınıza göre düzeltin
import { KurumsalLink } from '../Entities/kurumsalLink.entity'; // path'i kendi yapınıza göre düzeltin
import { KisaLinkOlusturDto } from '../DTO/kisaLink_olustur.dto'; // path'i kendi yapınıza göre düzeltin
import { KisiselLinkOlusturDto } from '../DTO/kisiselLink_olustur.dto'; // path'i kendi yapınıza göre düzeltin
import { KurumsalLinkOlusturDto } from '../DTO/kurumsalLink_olustur.dto'; // path'i kendi yapınıza göre düzeltin
import { KisaLinkGuncelleDto } from '../DTO/kisaLink_guncelle.dto'; // path'i kendi yapınıza göre düzeltin
import { KisiselLinkGuncelleDto } from '../DTO/kisiselLink_guncelle.dto'; // path'i kendi yapınıza göre düzeltin
import { KurumsalLinkGuncelleDto } from '../DTO/kurumsalLink_guncelle.dto'; // path'i kendi yapınıza göre düzeltin
import { LinkIslemlerService } from 'src/link_islemler/link_islemler.service';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Public } from 'src/auth/decorators/public.deacorator';

@Resolver()
export class LinkIslemlerGraphQl { // Sınıf adını dosya adına göre değiştirebilirsiniz (LinkIslemlerResolver)
    constructor(private readonly linkIslemlerService: LinkIslemlerService) { }


    @Public()
    @Mutation(() => Link, { name: 'kisaLinkOlustur' }) // GraphQL şemanızla eşleşmesi için name eklenebilir
    async createLink(@Args('linkData') linkData: KisaLinkOlusturDto): Promise<Link> {
        return this.linkIslemlerService.createLink(linkData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN,Role.KULLANICI)
    @Mutation(() => Link, { name: 'kisaLinkGuncelle' })
    async updateLink(
        @Args('id', { type: () => String }) id: string,
        @Args('linkData') linkData: KisaLinkGuncelleDto,
        @Context() ctx: any,
    ): Promise<Link> {

        
        const currentUser = ctx.req.user;
        const kisaLink = await this.linkIslemlerService.getLinkById(id);

        if (currentUser.role === Role.KULLANICI) {
            const sahipId = kisaLink.kullanici?.id; // Kısa linkin sahibi ID'si
            if (!sahipId || sahipId !== currentUser.id) {
                throw new ForbiddenException("Bu uyarıyı görme yetkiniz yok.");
            }
        }


        return this.linkIslemlerService.updateLink(id, linkData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN,Role.KULLANICI)
    @Mutation(() => KisiselLink, { name: 'kisiselLinkOlustur' })
    async createKisiselLink(@Args('kisiselLinkData') kisiselLinkData: KisiselLinkOlusturDto, @Context() ctx: any): Promise<KisiselLink> {
        const currentUser = ctx.req.user;
        if (currentUser.role === Role.KULLANICI) {
            const sahipId = kisiselLinkData?.kullaniciId; // Kısa linkin sahibi ID'si
            if (!sahipId || sahipId !== currentUser.id) {
                throw new ForbiddenException("Bu uyarıyı görme yetkiniz yok.");
            }
        }
        return this.linkIslemlerService.createKisiselLink(kisiselLinkData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN,Role.KULLANICI)
    @Mutation(() => KisiselLink, { name: 'kisiselLinkGuncelle' })
    async updateKisiselLink(
        @Args('id', { type: () => String }) id: string, // KisiselLink ID'si String olmalı (PrimaryGeneratedColumn('uuid'))
        @Args('kisiselLinkData') kisiselLinkData: KisiselLinkGuncelleDto,
        @Context() ctx: any,
    ): Promise<KisiselLink> {
        const currentUser = ctx.req.user;
        const kisiselLink = await this.linkIslemlerService.getKisiselLinkById(id);

        if (currentUser.role === Role.KULLANICI) {
            const sahipId = kisiselLink.kullanici?.id; // Kısa linkin sahibi ID'si
            if (!sahipId || sahipId !== currentUser.id) {
                throw new ForbiddenException("Bu uyarıyı görme yetkiniz yok.");
            }
        }
        return this.linkIslemlerService.updateKisiselLink(id, kisiselLinkData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN,Role.KULLANICI)
    @Mutation(() => KurumsalLink, { name: 'kurumsalLinkOlustur' })
    async createKurumsalLink(@Args('kurumsalLinkData') kurumsalLinkData: KurumsalLinkOlusturDto, @Context() ctx: any): Promise<KurumsalLink> {
        const currentUser = ctx.req.user;
        if (currentUser.role === Role.KULLANICI) {
            const sahipId = kurumsalLinkData?.kullaniciId; // Kısa linkin sahibi ID'si
            if (!sahipId || sahipId !== currentUser.id) {
                throw new ForbiddenException("Bu uyarıyı görme yetkiniz yok.");
            }
        }
        return this.linkIslemlerService.createKurumsalLink(kurumsalLinkData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.KULLANICI)
    @Mutation(() => KurumsalLink, { name: 'kurumsalLinkGuncelle' })
    async updateKurumsalLink(
        @Args('id', { type: () => Float }) id: number, // KurumsalLink ID'si Number (Float)
        @Args('kurumsalLinkData') kurumsalLinkData: KurumsalLinkGuncelleDto,
        @Context() ctx: any,
    ): Promise<KurumsalLink> {
        const currentUser = ctx.req.user;
        const kurumsalLink = await this.linkIslemlerService.getKurumsalLinkById(id);

        if (currentUser.role === Role.KULLANICI) {
            const sahipId = kurumsalLink.kullanici?.id; // Kısa linkin sahibi ID'si
            if (!sahipId || sahipId !== currentUser.id) {
                throw new ForbiddenException("Bu uyarıyı görme yetkiniz yok.");
            }
        }
        return this.linkIslemlerService.updateKurumsalLink(id, kurumsalLinkData);
    }

    // Get a single Link by ID
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN,Role.KULLANICI)
    @Query(() => Link, { name: 'getLinkById' })
    async getLinkById(@Args('id', { type: () => String }) id: string): Promise<Link> {
        return this.linkIslemlerService.getLinkById(id);
    }


    @Public()
    @Query(() => Link, { name: 'getLinkByIdShortUrl' })
    async getLinkByIdShortUrl(@Args('kisaltmaToken', { type: () => String }) kisaltmaToken: string): Promise<Link> {
        return this.linkIslemlerService.getLinkByShortUrl(kisaltmaToken);
    }

    // Get all Links
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => [Link], { name: 'getAllLinks' })
    async getAllLinks(): Promise<Link[]> {
        return this.linkIslemlerService.getAllLinks();
    }

    // Get a single KisiselLink by ID
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => KisiselLink, { name: 'getKisiselLinkById' })
    async getKisiselLinkById(@Args('id', { type: () => String }) id: string): Promise<KisiselLink> {
        return this.linkIslemlerService.getKisiselLinkById(id);
    }

    // Get all KisiselLinks
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => [KisiselLink], { name: 'getAllKisiselLinks' })
    async getAllKisiselLinks(): Promise<KisiselLink[]> {
        return this.linkIslemlerService.getAllKisiselLinks();
    }

    // Get a single KurumsalLink by ID
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => KurumsalLink, { name: 'getKurumsalLinkById' })
    async getKurumsalLinkById(@Args('id', { type: () => Number }) id: number): Promise<KurumsalLink> {
        return this.linkIslemlerService.getKurumsalLinkById(id);
    }

    // Get all KurumsalLinks
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => [KurumsalLink], { name: 'getAllKurumsalLinks' })
    async getAllKurumsalLinks(): Promise<KurumsalLink[]> {
        return this.linkIslemlerService.getAllKurumsalLinks();
    }

    @Public()
    @Query(() => String, { name: 'getRandomLink' })
    async getRandomLink(): Promise<string> {
        return await this.linkIslemlerService.getRandomLink();
    }
}