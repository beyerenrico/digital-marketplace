import Link from 'next/link';
import Cart from '@/components/cart';
import Logo from '@/components/logo';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import NavItems from '@/components/nav-items';
import { buttonVariants } from '@/components/ui/button';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = ({}) => {
  const user = null;

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* TODO: Mobile Nav */}

              <div className='ml-4 flex lg:ml-0'>
                <Link
                  href='/'
                >
                  <Logo />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {user ? null : (
                    <Link
                      className={buttonVariants({ variant: 'ghost' })}
                      href='/sign-in'
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      aria-hidden={true}
                      className='h-6 w-px bg-gray-200'
                    />
                  )}

                  {user ? null : (
                    <Link
                      className={buttonVariants({ variant: 'ghost' })}
                      href='/sign-up'
                    >
                      Create Account
                    </Link>
                  )}

                  {user ? (
                    <span
                      aria-hidden={true}
                      className='h-6 w-px bg-gray-200'
                    />
                  ) : null}

                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        aria-hidden={true}
                        className='h-6 w-px bg-gray-200'
                      />
                    </div>
                  )}

                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
