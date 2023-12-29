import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';
import { Perk } from '@/app/[lang]/dictionaries/types';

const perks: Perk[] = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description: 'All products are delivered instantly after purchase.'
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description: 'Every asset is verified by our team to ensure highest quality standards.'
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description: 'We plant a tree for every purchase made on our platform.'
  },
];

export default {
  'pages': {
    'home': {
      'hero': {
        'headline': {
          'text': 'Your marketplace for high-quality ',
          'highlightedText': 'digital assets'
        },
        'subline': 'Welcome to DigitalMarketplace. Every asset on our platform is verified by our team to ensure highest quality standards.',
        'button' : {
          'primary': {
            'text': 'Browse trending',
            'link': '/en/products'
          },
          'secondary': 'Our quality promise →'
        }
      },
      'perks': perks
    }
  }
} as const;
