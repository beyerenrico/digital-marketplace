'use client';

import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { formatPrice } from '@/lib/utils';

type CartProps = {};

const Cart: React.FC<CartProps> = ({}) => {
  const itemCount = 0;
  const cartTotal = 20.39 * itemCount;
  const fee = 1.99;

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingBag
          aria-hidden={true}
          className='flex-shrink-0 text-gray-400 group-hover:text-gray-500'
          size={24}
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* TODO: Cart Logic */}
              Cart Items
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-sm'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    className={buttonVariants({ className: 'w-full' })}
                    href='/cart'
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div
              aria-hidden={true}
              className='relative mb-4 h-60 w-60 text-muted-foreground'
            >
              <Image
                alt='Empty card graphic'
                className='object-center object-contain'
                fill
                src='/images/cart-empty.jpg'
              />
            </div>
            <div className='text-xl font-semibold'>Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                className={buttonVariants({ variant: 'link', size: 'sm', className: 'text-sm text-muted-foreground' })}
                href='/products'
              >
                Continue Shopping
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
