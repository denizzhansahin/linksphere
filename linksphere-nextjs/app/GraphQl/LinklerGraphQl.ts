import { gql } from '@apollo/client';


export const getRandomLink = gql`
query {
  getRandomLink
}`

export const GET_PERSONAL_KISA_LINK = gql`
query GetKullaniciLinkleriById($kullaniciId: String!) {
  kullaniciBul(id: $kullaniciId) {
    id
    nickname
    linkler {
      id
      asilMetinAdi
      kisaltmaToken
      olusturmaTarihi
      guncellemeTarihi
    }
  }
}
`

export const GET_PERSONAL_LINKS = gql`
  query GetPersonalLinks($userId: String!) {
    kullaniciBul(id: $userId) {
      id
      nickname # İsteğe bağlı olarak kullanıcı bilgilerini de alabilirsiniz
      kisiselLink { # Kullanici tipindeki "kisiselLink" alanı
        id
        instagram
        facebook
        x
        spotify
        youtube
        linkedin
        reddit
        vk
        medium
        webSite
        favoriMuzikVideom
        youtubeList
        youtubeVideo
        blogSitem
        spotifyList
        alisverisListem
      }
    }
  }
`;


export const GET_CORPORATE_LINKS = gql`
  query GetCorporateLinks($userId: String!) {
    kullaniciBul(id: $userId) {
      id
      nickname 
      kurumsalLink {
        id
        isEpostasi
        isWebSitesi
        isyeriWebSitesi
        isYeriAdresi
        isTelefonu
        isYeriTelefon
        isYeriEposta
        olusturmaTarihi
        guncellemeTarihi
  
        isyeriLinkedin
        isyeriTwitter
        isyeriUrunKatalogu
        isyeriBasinKiti
        isyeriKariyerler
        isyeriAdi
      }
    }
  }
`;



export const CREATE_KISISEL_LINK_MUTATION = gql`
  mutation KisiselLinkOlustur($linkData: KisiselLinkOlusturDto!) {
    kisiselLinkOlustur(kisiselLinkData: $linkData) {
      id
      instagram
      facebook
      x
      spotify
      youtube
      linkedin
      reddit
      vk
      medium
      webSite
      favoriMuzikVideom
      youtubeList
      youtubeVideo
      blogSitem
      spotifyList
      alisverisListem
    }
  }
`;

export const UPDATE_KISISEL_LINK_MUTATION = gql`
  mutation KisiselLinkGuncelle($linkId: String!, $linkData: KisiselLinkGuncelleDto!) {
    kisiselLinkGuncelle(id: $linkId, kisiselLinkData: $linkData) {
      id
      instagram
      facebook
      x
      spotify
      youtube
      linkedin
      reddit
      vk
      medium
      webSite
      favoriMuzikVideom
      youtubeList
      youtubeVideo
      blogSitem
      spotifyList
      alisverisListem
    }
  }
`;



export const CREATE_KURUMSAL_LINK_MUTATION = gql`
  mutation KurumsalLinkOlustur($linkData: KurumsalLinkOlusturDto!) {
    kurumsalLinkOlustur(kurumsalLinkData: $linkData) {
      id
      isEpostasi
      isWebSitesi
      isyeriWebSitesi
      isYeriAdresi
      isTelefonu
      isYeriTelefon
      isYeriEposta
      olusturmaTarihi
      guncellemeTarihi
      kullanici {
        id
        nickname
      }

      isyeriLinkedin
      isyeriTwitter
      isyeriUrunKatalogu
      isyeriBasinKiti
      isyeriKariyerler
      isyeriAdi
    }
  }
`;

export const UPDATE_KURUMSAL_LINK_MUTATION = gql`
  mutation KurumsalLinkGuncelle($linkId: Float!, $linkData: KurumsalLinkGuncelleDto!) { # ID tipi Float!
    kurumsalLinkGuncelle(id: $linkId, kurumsalLinkData: $linkData) {
      id
      isEpostasi
      isWebSitesi
      isyeriWebSitesi
      isYeriAdresi
      isTelefonu
      isYeriTelefon
      isYeriEposta
      guncellemeTarihi
      kullanici {
        id
        nickname
      }

      isyeriLinkedin
      isyeriTwitter
      isyeriUrunKatalogu
      isyeriBasinKiti
      isyeriKariyerler
      isyeriAdi
    }
  }
`;


export const GET_KISISEL_LINK = gql`
query GetKisiselLinkByNickname($userNickname: String!) {
  kullaniciBul_profil(nickname: $userNickname) {
  nickname
    isim
    soyisim
    fotograf
    kisiselLink {
      id
      instagram
      facebook
      x
      spotify
      youtube
      linkedin
      reddit
      vk
      medium
      webSite
      favoriMuzikVideom
      youtubeList
      youtubeVideo
      blogSitem
      spotifyList
      alisverisListem
    }
  }
}
`


export const GET_KURUMSAL_LINK = gql`
query GetKurumsalLinkByNickname($userNickname: String!) {
  kullaniciBul_profil(nickname: $userNickname) {
    # İsterseniz kullanıcıyla ilgili diğer bilgileri de alabilirsiniz
    nickname
    isim
    soyisim
    fotograf
    kurumsalLink {
      id
      isEpostasi
      isWebSitesi
      isyeriWebSitesi
      isYeriAdresi
      isTelefonu
      isYeriTelefon
      isYeriEposta
      isyeriLinkedin
      isyeriTwitter
      isyeriUrunKatalogu
      isyeriBasinKiti
      isyeriKariyerler
      isyeriAdi
      olusturmaTarihi
      guncellemeTarihi
      # Eğer kurumsal linkin bağlı olduğu kullanıcıyı tekrar almak isterseniz:
      # kullanici {
      #   id
      #   nickname
      # }
    }
  }
}
`


export const CREATE_KISA_LINK = gql `
mutation KisaLinkOlusturMutation($linkData: KisaLinkOlusturDto!) {
  kisaLinkOlustur(linkData: $linkData) {
    asilMetinAdi
    kisaltmaToken
    olusturmaTarihi
  }
}

`

export const CREATE_KULLANICI_KISALTLINK = gql `
mutation KisaLinkOlusturMutation($linkData: KisaLinkOlusturDto!) {
  kisaLinkOlustur(linkData: $linkData) {
    asilMetinAdi
    kisaltmaToken
    olusturmaTarihi
    kullanici {
      nickname
    }
  }
}
`

export const GET_KISA_LINK = gql `
query GetLinkByShortToken($token: String!) {
  getLinkByIdShortUrl(kisaltmaToken: $token) {
    asilMetinAdi
    kisaltmaToken
  }
}
`