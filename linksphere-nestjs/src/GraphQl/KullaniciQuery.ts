import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'; // Int eklendi
import { UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common'; // Exceptionlar eklendi


import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { KullaniciService } from 'src/kullanici/kullanici.service';
import { Kullanici } from 'src/Entities/kullanici.entity';
import { KullaniciOlusturDto } from 'src/DTO/kullanici_olustur.dto';
import { KullaniciGuncelleDto } from 'src/DTO/kullanici_guncelle.dto';
import { Public } from 'src/auth/decorators/public.deacorator';
// import { Public } from 'src/auth/decorators/public.deacorator'; // Kullanılmıyor gibi

@Resolver(() => Kullanici)
// Guardları sınıf seviyesinde uygula
export class KullaniciGraphQl {
    constructor(private kullaniciService: KullaniciService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Query(() => [Kullanici], { name: 'kullanicilar' })
    async getAllKullanicilar(): Promise<Kullanici[]> {
        return this.kullaniciService.findAll();
    }

    @Roles(Role.ADMIN, Role.KULLANICI)
    @Query(() => Kullanici, { name: 'kullaniciBul', nullable: true }) // nullable: true eklendi
    async getKullanici(
        @Args('id', { type: () => String }) id: string, // Arg tipi Int olmalı
        @Context() ctx: any,
    ): Promise<Partial<Kullanici> | null> { // Dönüş tipi Partial<Kullanici> | null olarak güncellendi
        const currentUser = ctx.req.user;

        // Yetkilendirme: Çiftçi ise sadece kendi ID'sini sorgulayabilir
        if (currentUser.role === Role.KULLANICI && currentUser.id !== id) {
            throw new ForbiddenException('Başka bir kullanıcıyı sorgulayamazsınız.');
        }

        try {
            const user = await this.kullaniciService.kullaniciBul(id);
            return user; // Servis zaten bulunamazsa hata fırlatmalı veya null dönmeli
        } catch (error) {
            // Servis NotFoundException fırlatırsa null dön
            if (error instanceof NotFoundException) {
                return null;
            }
            throw error; // Diğer hataları fırlat
        }
    }

    @Public()
    @Mutation(() => Kullanici, { name: 'kullaniciOlustur' })
    async createKullanici(
        @Args('kullaniciData') kullaniciData: KullaniciOlusturDto,
    ): Promise<Kullanici> {
        return this.kullaniciService.kullaniciOlustur(kullaniciData);
    }

    @Roles(Role.ADMIN, Role.KULLANICI)
    @Mutation(() => Kullanici, { name: 'kullaniciGuncelle' }) // name eklendi
    async kullaniciGuncelle( // async eklendi, dönüş tipi Promise<Kullanici> olmalı
        @Args('kullaniciId', { type: () => String }) kullaniciId: string, // Arg tipi Int olmalı
        @Args('kullaniciGuncelleData') kullaniciGuncelleData: KullaniciGuncelleDto,
        @Context() ctx: any,
    ): Promise<Kullanici> {
        const currentUser = ctx.req;

        // Yetkilendirme: Çiftçi ise sadece kendi ID'sini güncelleyebilir
        if (currentUser.role === Role.KULLANICI && currentUser.id !== kullaniciId) {
            throw new ForbiddenException('Başka bir kullanıcıyı güncelleyemezsiniz.');
        }

        // Servis zaten bulunamazsa hata fırlatmalı
        return this.kullaniciService.kullaniciGuncelle(kullaniciId, kullaniciGuncelleData);
    }



    @Public()
    @Query(() => Kullanici, { name: 'kullaniciBul_profil', nullable: true }) // nullable: true eklendi
    async getNickname(
        @Args('nickname', { type: () => String }) nickname: string, // Arg tipi Int olmalı

    ): Promise<Kullanici | null> { // Dönüş tipi | null olarak güncellendi


        try {
            const user = await this.kullaniciService.findNickname(nickname);
            if (!user) {
                return null;
            }
            const { id, eposta, sifre, olusturmaTarihi, guncellemeTarihi, silmeTarihi, role, ...yeniUser } = user;
            return {
                ...yeniUser,
                id: user.id || '', 
            } as Kullanici;
        } catch (error) {
            // Servis NotFoundException fırlatırsa null dön
            if (error instanceof NotFoundException) {
                return null;
            }
            throw error; // Diğer hataları fırlat
        }
    }

    // New Query to get random nickname
    @Public()
    @Query(() => String, { name: 'getRandomNickname' })
    async getRandomNickname(): Promise<string> {
        return await this.kullaniciService.getRandomNickname();
    }
}