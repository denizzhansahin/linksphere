import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KullaniciGuncelleDto } from 'src/DTO/kullanici_guncelle.dto';
import { KullaniciOlusturDto } from 'src/DTO/kullanici_olustur.dto';
import { Kullanici } from 'src/Entities/kullanici.entity';
import { KisiselLink } from 'src/Entities/kisiselLink.entity'; // NEW import
import { KurumsalLink } from 'src/Entities/kurumsalLink.entity'; // NEW import

import { Repository } from 'typeorm';

@Injectable()
export class KullaniciService {
    constructor(
        @InjectRepository(Kullanici) private kullaniciRepository: Repository<Kullanici>,
        @InjectRepository(KisiselLink) private kisiselLinkRepository: Repository<KisiselLink>, // NEW
        @InjectRepository(KurumsalLink) private kurumsalLinkRepository: Repository<KurumsalLink>, // NEW
    ) { }

    // Yeni kullanıcı oluştur
    async kullaniciOlustur(kullaniciData: KullaniciOlusturDto) {
        const newUser = this.kullaniciRepository.create(kullaniciData);
        
        // Create empty personal link and corporate link entries
        const newKisiselLink = this.kisiselLinkRepository.create({}); // empty initial data
        const savedKisiselLink = await this.kisiselLinkRepository.save(newKisiselLink);
        
        const newKurumsalLink = this.kurumsalLinkRepository.create({}); // empty initial data
        const savedKurumsalLink = await this.kurumsalLinkRepository.save(newKurumsalLink);
        
        // Associate the created links with the new user
        newUser.kisiselLink = savedKisiselLink;
        newUser.kurumsalLink = savedKurumsalLink;
        
        return await this.kullaniciRepository.save(newUser);
    }

    // Tüm kullanıcıları getir
    async findAll(): Promise<Kullanici[]> {
        return this.kullaniciRepository.find({relations: ['linkler','kisiselLink','kurumsalLink'
        ]});
    }

    async kullaniciBul(id: string): Promise<Kullanici> {
        const kullanici = await this.kullaniciRepository.findOne({
            where: { id },
            relations: ['linkler','kisiselLink','kurumsalLink'
            ]
        });
        if (!kullanici) {
            throw new Error('Kullanıcı yok');
        }
        return kullanici;
    }

    async findByEmail(eposta:string){
        return await this.kullaniciRepository.findOne({
          where:{
            eposta:eposta,
          }
        })
      }


      async findNickname(nickname:string){
        return await this.kullaniciRepository.findOne({
          where:{
            nickname:nickname,
          },
          relations: ['linkler','kisiselLink','kurumsalLink'
          ]
        })
      }


    async kullaniciGuncelle(kullaniciId: string, kullaniciGuncelleData: KullaniciGuncelleDto) {
        const kullanici = await this.kullaniciRepository.findOneBy({ id: kullaniciId });
        if (!kullanici) {
            throw new HttpException('Kullanici Yok', HttpStatus.NOT_FOUND);
        }

        Object.assign(kullanici, kullaniciGuncelleData);

        return await this.kullaniciRepository.save(kullanici);
    }
    
    // New function: returns a random user's nickname from the database
    async getRandomNickname(): Promise<string> {
        const users = await this.kullaniciRepository.find();
        if (!users.length) {
            throw new Error("No user found");
        }
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex].nickname;
    }
}
