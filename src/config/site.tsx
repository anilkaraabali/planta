import {
  LiaFacebook,
  LiaGithub,
  LiaInstagram,
  LiaYoutube,
} from 'react-icons/lia';

type SiteConfig = typeof siteConfig;

const siteConfig = {
  footerItems: [
    {
      children: [
        {
          href: '/customer-service',
          translationKey: 'customerService',
        },
        {
          href: '#',
          translationKey: 'storeLocator',
        },
        {
          href: '#',
          translationKey: 'giftCards',
        },
      ],
      translationKey: 'help',
    },
    {
      children: [
        {
          href: '/legal/terms-of-service',
          translationKey: 'termsOfService',
        },
        {
          href: '/legal/privacy-policy',
          translationKey: 'privacyPolicy',
        },
        {
          href: '/legal/cookies-policy',
          translationKey: 'cookiesPolicy',
        },
        {
          href: '/legal/license',
          translationKey: 'license',
        },
      ],
      translationKey: 'legal',
    },
  ],
  navMenuItems: [
    {
      children: [],
      href: '/ladies',
      translationKey: 'women',
    },
    {
      children: [],
      href: '/men',
      translationKey: 'men',
    },
    {
      children: [],
      href: '/kids',
      translationKey: 'kids',
    },
    {
      children: [],
      href: '/home',
      translationKey: 'home',
    },
  ],
  socialItems: [
    {
      href: '#',
      icon: LiaFacebook,
      title: 'Facebook',
    },
    {
      href: '#',
      icon: LiaInstagram,
      title: 'Instagram',
    },
    {
      href: '#',
      icon: LiaYoutube,
      title: 'Youtube',
    },
    {
      href: '#',
      icon: LiaGithub,
      title: 'GitHub',
    },
  ],
};

export type { SiteConfig };
export { siteConfig };
