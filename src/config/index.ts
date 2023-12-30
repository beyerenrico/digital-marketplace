export const PRODUCT_CATEGORIES = [
  {
    label: 'UI Kits',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Editor picks',
        href: '#',
        imageSrc: '/images/nav/ui-kits/dashboard.png'
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/images/nav/ui-kits/finance.png'
      },
      {
        name: 'Bestsellers',
        href: '#',
        imageSrc: '/images/nav/ui-kits/remix.png'
      }
    ]
  },
  {
    label: 'Icons',
    value: 'icons' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: '#',
        imageSrc: '/images/nav/icons/green.png'
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/images/nav/icons/purple.webp'
      },
      {
        name: 'Bestselling Icons',
        href: '#',
        imageSrc: '/images/nav/icons/samsung.png'
      }
    ]
  }
];
