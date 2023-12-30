'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/config';
import { cn } from '@/lib/utils';

type Category = (typeof PRODUCT_CATEGORIES)[number];

type NavItemProps = {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  category,
  handleOpen,
  isOpen,
  isAnyOpen
}) => {
  return (
    <div className='flex'>
      <div className='relative flex items-center'>
        <Button
          className='gap-1.5'
          onClick={handleOpen}
          variant={isOpen ? 'secondary' : 'ghost'}
        >
          {category.label}
          <ChevronDown
            className={cn('transition-all text-muted-foreground', {
              '-rotate-180': isOpen
            })}
            size={16}
          />
        </Button>
      </div>

      {isOpen && (
        <div className={cn('absolute inset-x-0 top-full text-sm text-muted-foreground', {
          'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen,
        })}
        >
          <div
            aria-hidden={true}
            className='absolute inset-0 top-1/2 bg-white shadow'
          />
          <div className='relative bg-white'>
            <div className='mx-auto max-w-7xl px-8'>
              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                  {category.featured.map((product) => (
                    <div
                      className='group relative sm:text-sm'
                      key={product.name}
                    >
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                        <Image
                          alt='Product Category Image'
                          className='object-cover object-center'
                          fill
                          src={product.imageSrc}
                        />
                      </div>

                      <Link
                        className='mt-6 block font-medium text-gray-900'
                        href={product.href}
                      >
                        {product.name}
                      </Link>
                      <p
                        aria-hidden={true}
                        className='mt-1'
                      >Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
