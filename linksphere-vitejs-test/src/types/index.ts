export interface Link {
  id: string;
  asilMetinAdi: string;
  kisaltmaToken: string;
  olusturmaTarihi: Date;
  guncellemeTarihi: Date;
  kullanici?: Kullanici;
}

export interface KisiselLink {
  id: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  spotify?: string;
  youtube?: string;
  linkedin?: string;
  reddit?: string;
  vk?: string;
  medium?: string;
  webSite?: string;
  favoriMuzikVideom?: string;
  youtubeList?: string;
  youtubeVideo?: string;
  blogSitem?: string;
  spotifyList?: string;
  alisverisListem?: string;
}

export interface KurumsalLink {
  id: number;
  isEpostasi?: string;
  isWebSitesi?: string;
  isyeriWebSitesi?: string;
  isYeriAdresi?: string;
  isTelefonu?: string;
  isYeriTelefon?: string;
  isYeriEposta?: string;
  kullanici?: Kullanici;
  olusturmaTarihi: Date;
  guncellemeTarihi: Date;
}

export interface Kullanici {
  id: string;
  nickname: string;
  isim: string;
  soyisim: string;
  eposta: string;
  sifre: string;
  olusturmaTarihi: Date;
  silmeTarihi?: Date | null;
  guncellemeTarihi: Date;
  ulke?: string;
  fotograf?: string;
  linkler?: Link[];
  kisiselLink?: KisiselLink;
  kurumsalLink?: KurumsalLink;
  role?: string;
}