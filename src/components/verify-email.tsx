'use client';

import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { trpc } from '@/trpc/client';

type VerifyEmailProps = {
  token: string;
};

const VerifyEmail: React.FC<VerifyEmailProps> = ({ token }) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({ token });

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2
          className='animate-spin text-zinc-300'
          size={32}
        />
        <h3 className='font-semibold text-xl'>Verifying...</h3>
        <p className='text-muted-foreground text-sm text-center'>
          This won&apos;t take long.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle
          className='text-red-600'
          size={32}
        />
        <h3 className='font-semibold text-xl'>There was a problem</h3>
        <p className='text-muted-foreground text-sm text-center'>
          This token is not valid or might be expired.<br /> Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
          <Image
            alt='The Email was sent'
            className='object-center object-contain'
            fill
            src='/images/email-sent.png'
          />
        </div>

        <h3 className='font-semibold text-2xl'>You&apos;re all set!</h3>
        <p className='text-muted-foreground text-center mt-1'>Thank you for verifying your email.</p>
        <Link
          className={buttonVariants({ className: 'mt-4' })}
          href='/sign-in'
        >Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <XCircle
        className='text-red-600'
        size={32}
      />
      <h3 className='font-semibold text-xl'>This doesn&apos;t seem right.</h3>
      <p className='text-muted-foreground text-sm text-center'>
        There might be a problem with the server.<br /> Please try again.
      </p>
    </div>
  );
};

export default VerifyEmail;
