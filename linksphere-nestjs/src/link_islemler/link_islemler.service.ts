import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from 'src/Entities/kisalink.entity';
import { KisiselLink } from 'src/Entities/kisiselLink.entity';
import { KurumsalLink } from 'src/Entities/kurumsalLink.entity';
import { Kullanici } from 'src/Entities/kullanici.entity'; // Kullanici entity'sini import et
import { KisaLinkOlusturDto } from 'src/DTO/kisaLink_olustur.dto';
import { KisiselLinkOlusturDto } from 'src/DTO/kisiselLink_olustur.dto';
import { KurumsalLinkOlusturDto } from 'src/DTO/kurumsalLink_olustur.dto';
import { KisaLinkGuncelleDto } from 'src/DTO/kisaLink_guncelle.dto';
import { KisiselLinkGuncelleDto } from 'src/DTO/kisiselLink_guncelle.dto';
import { KurumsalLinkGuncelleDto } from 'src/DTO/kurumsalLink_guncelle.dto';

@Injectable()
export class LinkIslemlerService {
    constructor(
        @InjectRepository(Link) private linkRepository: Repository<Link>,
        @InjectRepository(KisiselLink) private kisiselLinkRepository: Repository<KisiselLink>,
        @InjectRepository(KurumsalLink) private kurumsalLinkRepository: Repository<KurumsalLink>,
        @InjectRepository(Kullanici) private kullaniciRepository: Repository<Kullanici>, // KullaniciRepository'yi inject et
    ) {}

    // Create Link
    async createLink(linkData: KisaLinkOlusturDto): Promise<Link> {
        const { kullaniciId, ...restLinkData } = linkData;
        let kullanici: Kullanici | undefined = undefined;

        if (kullaniciId) {
            kullanici = (await this.kullaniciRepository.findOneBy({ id: kullaniciId })) || undefined;
            if (!kullanici) {
                throw new NotFoundException(`User with ID ${kullaniciId} not found`);
            }
        }

        const kisaltmaToken = Math.random().toString(36).substring(2, 8);

        const newLink = this.linkRepository.create({
            ...restLinkData,
            kullanici: kullanici, // Kullanıcıyı ata (undefined olabilir)
            kisaltmaToken: kisaltmaToken, // Kısa link token'ını oluştur
        });

        const { id, ...yeniLink } = newLink;
        return await this.linkRepository.save(newLink);
    }

    // Update Link
    async updateLink(id: string, linkData: KisaLinkGuncelleDto): Promise<Link> {
        const link = await this.linkRepository.findOneBy({ id });
        if (!link) throw new NotFoundException('Link not found');
        
        // kullaniciId'nin güncellenmesini istemiyorsak DTO'dan çıkarabilir veya burada engelleyebiliriz.
        // Şimdilik olduğu gibi bırakıyorum, DTO'da PartialType ile isteğe bağlı olacak.
        if (linkData.kullaniciId && link.kullanici?.id !== linkData.kullaniciId) {
            const newKullanici = await this.kullaniciRepository.findOneBy({ id: linkData.kullaniciId });
            if (!newKullanici) {
                throw new NotFoundException(`New user with ID ${linkData.kullaniciId} not found for link transfer`);
            }
            link.kullanici = newKullanici;
        }
        
        const { kullaniciId, ...restUpdateData } = linkData; // kullaniciId'yi çıkardık, elle yönettik
        Object.assign(link, restUpdateData);
        return await this.linkRepository.save(link);
    }

    // Create KisiselLink
    async createKisiselLink(kisiselLinkData: KisiselLinkOlusturDto): Promise<KisiselLink> {
        const { kullaniciId, ...restKisiselLinkData } = kisiselLinkData;

        const kullanici = await this.kullaniciRepository.findOne({
            where: { id: kullaniciId },
            relations: ['kisiselLink'], // Mevcut kisiselLink'i kontrol etmek için yükle
        });

        if (!kullanici) {
            throw new NotFoundException(`User with ID ${kullaniciId} not found`);
        }

        if (kullanici.kisiselLink) {
            throw new ConflictException(`User with ID ${kullaniciId} already has a KisiselLink. Use update instead.`);
        }

        const newKisiselLink = this.kisiselLinkRepository.create({
            ...restKisiselLinkData,
            // kullanici: kullanici, // Bu şekilde doğrudan atama yapmayacağız, Kullanici entity'si üzerinden ilişki kurulacak
        });
        const savedKisiselLink = await this.kisiselLinkRepository.save(newKisiselLink);

        // Kullanici entity'sindeki ilişkiyi güncelle ve kaydet
        kullanici.kisiselLink = savedKisiselLink;
        await this.kullaniciRepository.save(kullanici);
        
        // TypeORM'in ilişkiyi doğru yüklemesi için KisiselLink'i kullanıcı bilgisiyle döndür
        const kisiselLink = await this.kisiselLinkRepository.findOne({
            where: { id: savedKisiselLink.id },
            relations: ['kullanici']
        });

        if (!kisiselLink) {
            throw new NotFoundException('Kisisel Link not found after creation');
        }

        return kisiselLink;
    }

    // Update KisiselLink
    // KisiselLink'in ID'si ile güncelleme (Kullanıcı ID'si ile değil)
    // Eğer bir kullanıcının kişisel linkini güncellemek istiyorsanız, önce kullanıcıyı bulup onun kisiselLink'ini almanız gerekir.
    async updateKisiselLink(id: string, kisiselLinkData: KisiselLinkGuncelleDto): Promise<KisiselLink> {
        const kisiselLink = await this.kisiselLinkRepository.findOneBy({ id });
        if (!kisiselLink) throw new NotFoundException('Kisisel Link not found');
        
        // kullaniciId güncellemesi genellikle KisiselLink için yapılmaz.
        // Eğer DTO'da kullaniciId gelirse ve farklıysa ne yapılacağına karar vermek gerekir.
        // Şimdilik DTO'dan gelen kullaniciId'yi göz ardı ediyoruz, çünkü kisiselLink zaten bir kullanıcıya bağlı.
        const { kullaniciId, ...restUpdateData } = kisiselLinkData;

        Object.assign(kisiselLink, restUpdateData);
        return await this.kisiselLinkRepository.save(kisiselLink);
    }

    // Create KurumsalLink
    async createKurumsalLink(kurumsalLinkData: KurumsalLinkOlusturDto): Promise<KurumsalLink> {
        const { kullaniciId, ...restKurumsalLinkData } = kurumsalLinkData;

        const kullanici = await this.kullaniciRepository.findOne({
            where: { id: kullaniciId },
            relations: ['kurumsalLink'],
        });

        if (!kullanici) {
            throw new NotFoundException(`User with ID ${kullaniciId} not found`);
        }

        if (kullanici.kurumsalLink) {
            throw new ConflictException(`User with ID ${kullaniciId} already has a KurumsalLink. Use update instead.`);
        }

        const newKurumsalLink = this.kurumsalLinkRepository.create({
            ...restKurumsalLinkData,
            // kullanici: kullanici, // Kullanici entity'si üzerinden ilişki kurulacak
        });
        const savedKurumsalLink = await this.kurumsalLinkRepository.save(newKurumsalLink);
        
        kullanici.kurumsalLink = savedKurumsalLink;
        await this.kullaniciRepository.save(kullanici);

        const kurumsalLink = await this.kurumsalLinkRepository.findOne({
            where: { id: savedKurumsalLink.id },
            relations: ['kullanici']
        });

        if (!kurumsalLink) {
            throw new NotFoundException('Kurumsal Link not found after creation');
        }

        return kurumsalLink;
    }

    // Update KurumsalLink
    async updateKurumsalLink(id: number, kurumsalLinkData: KurumsalLinkGuncelleDto): Promise<KurumsalLink> {
        const kurumsalLink = await this.kurumsalLinkRepository.findOneBy({ id });
        if (!kurumsalLink) throw new NotFoundException('Kurumsal Link not found');

        const { kullaniciId, ...restUpdateData } = kurumsalLinkData;
        Object.assign(kurumsalLink, restUpdateData);
        return await this.kurumsalLinkRepository.save(kurumsalLink);
    }

    // Get a single Link by ID
    async getLinkById(id: string): Promise<Link> {
        const link = await this.linkRepository.findOne({
            where: { id },
            relations: ['kullanici'],
        });
        if (!link) throw new NotFoundException('Link not found');
        return link;
    }

    // Get a single Link by ID
    async getLinkByShortUrl(kisaltmaToken: string): Promise<Link> {
        const link = await this.linkRepository.findOne({
            where: { kisaltmaToken },
        });
        if (!link) throw new NotFoundException('Link not found');
        return link;
    }

    // Get all Links
    async getAllLinks(): Promise<Link[]> {
        return this.linkRepository.find({ relations: ['kullanici'] });
    }

    // Get a single KisiselLink by ID
    async getKisiselLinkById(id: string): Promise<KisiselLink> {
        const kisiselLink = await this.kisiselLinkRepository.findOne({
            where: { id },
            relations: ['kullanici'],
        });
        if (!kisiselLink) throw new NotFoundException('Kisisel Link not found');
        return kisiselLink;
    }

    // Get all KisiselLinks
    async getAllKisiselLinks(): Promise<KisiselLink[]> {
        return this.kisiselLinkRepository.find({ relations: ['kullanici'] });
    }

    // Get a single KurumsalLink by ID
    async getKurumsalLinkById(id: number): Promise<KurumsalLink> {
        const kurumsalLink = await this.kurumsalLinkRepository.findOne({
            where: { id },
            relations: ['kullanici'],
        });
        if (!kurumsalLink) throw new NotFoundException('Kurumsal Link not found');
        return kurumsalLink;
    }

    // Get all KurumsalLinks
    async getAllKurumsalLinks(): Promise<KurumsalLink[]> {
        return this.kurumsalLinkRepository.find({ relations: ['kullanici'] });
    }

    // New function: returns a random user's nickname from the database
    async getRandomLink(): Promise<string> {
        const users = await this.linkRepository.find();
        if (!users.length) {
            throw new Error("No user found");
        }
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex].kisaltmaToken;
    }
}