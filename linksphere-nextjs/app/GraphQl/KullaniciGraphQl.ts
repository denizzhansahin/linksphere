import { gql } from '@apollo/client';

export const RandomNickname = gql`
query {
  getRandomNickname
}`

export const CREATE_USER_MUTATION = gql`
  mutation YeniKullaniciOlustur($userData: KullaniciOlusturDto!) {
    kullaniciOlustur(kullaniciData: $userData) {
      id
      nickname
      isim
      soyisim
      eposta
      role
      ulke
      fotograf
      olusturmaTarihi
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation KullaniciGuncelle($kullaniciId: String!, $kullaniciGuncelleData: KullaniciGuncelleDto!) {
    kullaniciGuncelle(kullaniciId: $kullaniciId, kullaniciGuncelleData: $kullaniciGuncelleData) {
      id
      nickname
      isim
      soyisim
      eposta
      role
      ulke
      fotograf
      guncellemeTarihi
      createdAt
      updatedAt
    }
  }
`;




