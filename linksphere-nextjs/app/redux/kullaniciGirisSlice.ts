import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


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
// Kullanici arayüzünüzü güncelliyoruz
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

export interface KullaniciGirisState {
  eposta: string;
  sifre: string;
  hatirla: boolean;
  hata: string;
  yukleniyor: boolean;
  kimlik?: string;
  kullanici?: Kullanici;
}

export const girisState: KullaniciGirisState = {
  eposta: '',
  sifre: '',
  hatirla: false,
  hata: '',
  yukleniyor: false,
  kimlik: undefined,
  kullanici: undefined,
};

export const girisSlice = createSlice({
  name: 'giris',
  initialState: girisState,
  reducers: {
    setHata: (state, action: PayloadAction<string>) => {
      state.hata = action.payload;
    },
    setYukleniyor: (state, action: PayloadAction<boolean>) => {
      state.yukleniyor = action.payload;
    },
    setGiris: (state, action: PayloadAction<{ eposta: string; sifre: string }>) => {
      state.eposta = action.payload.eposta;
      state.sifre = action.payload.sifre;
    },
    setKullanici: (state, action: PayloadAction<Kullanici>) => {
      state.kullanici = action.payload;
    },
  },
});

export const { setGiris, setYukleniyor, setHata, setKullanici } = girisSlice.actions;

export default girisSlice.reducer;