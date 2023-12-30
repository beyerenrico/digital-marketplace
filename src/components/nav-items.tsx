'use client';

import { useRef, useState } from 'react';
import NavItem from '@/components/nav-item';
import { PRODUCT_CATEGORIES } from '@/config';
import { useClickAway } from '@/hooks/use-click-away';
import { useKeyPress } from '@/hooks/use-key-press';

type NavItemsProps = {};

const NavItems: React.FC<NavItemsProps> = ({}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isAnyOpen = activeIndex !== null;
  const ref = useRef<HTMLDivElement | null>(null);

  useKeyPress('Escape', () => setActiveIndex(null));
  useClickAway(ref, () => setActiveIndex(null));

  return (
    <div
      className='flex gap-4 h-full'
      ref={ref}
    >
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => setActiveIndex(activeIndex === index ? null : index);
        const isOpen = index === activeIndex;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
