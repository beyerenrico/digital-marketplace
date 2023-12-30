import {
  ArrowDownToLine, CheckCircle, Leaf
} from 'lucide-react';
import { Perk } from '@/app/[lang]/dictionaries/types';

const perks: Perk[] = [
  {
    name: 'Sofortige Lieferung',
    Icon: ArrowDownToLine,
    description: 'Alle Produkte werden sofort nach dem Kauf geliefert.'
  },
  {
    name: 'Garantierte Qualität',
    Icon: CheckCircle,
    description: 'Jedes Asset wird von unserem Team überprüft, um höchste Qualitätsstandards zu gewährleisten.'
  },
  {
    name: 'Für den Planeten',
    Icon: Leaf,
    description: 'Wir pflanzen für jeden Kauf auf unserer Plattform einen Baum.'
  },
];

export default {
  'pages': {
    'home': {
      'hero': {
        'headline': {
          'text': 'Ihr Marktplatz für hochwertige ',
          'highlightedText': 'digitale Assets'
        },
        'subline': 'Willkommen bei DigitalMarketplace. Jedes Asset auf unserer Plattform wird von unserem Team überprüft, um höchste Qualitätsstandards zu gewährleisten.',
        'button' : {
          'primary': {
            'text': 'Trending durchsuchen',
            'link': '/de/produkte'
          },
          'secondary': 'Unser Qualitätsversprechen →'
        }
      },
      'perks': perks
    }
  }
} as const;
