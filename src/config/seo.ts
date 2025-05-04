import { NextSeoProps } from 'next-seo';

const seoConfig: NextSeoProps = {
  description:
    'Individual care schedule and reminders for your plants, recommendations, step by step guides, identification, light meter and more. Keep your plants alive with Planta!',
  openGraph: {
    description:
      'Individual care schedule and reminders for your plants, recommendations, step by step guides, identification, light meter and more. Keep your plants alive with Planta!',
    images: [
      {
        height: 630,
        type: 'image/png',
        url: 'https://commerce-shopify-l1tiqh7el-vercel-solutions-vtest314.vercel.app/opengraph-image?376fa9d8052ebb8e',
        width: 1200,
      },
    ],
    locale: 'en_IE',
    site_name: 'Planta',
    title:
      'Individual care schedule and reminders for your plants, recommendations, step by step guides, identification, light meter and more. Keep your plants alive with Planta!',
    type: 'website',
    url: 'https://acme-commerce-beta.vercel.app',
  },
  title: 'Plant care app - Keep your plants alive | Planta',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@handle',
    site: 'https://acme-commerce-beta.vercel.app/',
  },
};

export { seoConfig };
