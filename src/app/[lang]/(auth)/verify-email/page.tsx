import Image from 'next/image';
import VerifyEmail from '@/components/verify-email';

type VerifyEmailPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ searchParams }) => {
  const { token, to: toEmail } = searchParams;

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                alt='Email sent graphic'
                className='object-center object-contain'
                fill
                src='/images/email-sent.png'
              />
            </div>

            <h3 className='font-semibold text-2xl'>Check your email</h3>

            <p className='text-muted-foreground text-center'>
              {toEmail ? (
                <>We&apos;ve sent a verification link to <span className='font-semibold'>{toEmail}</span>.</>
              ) : (
                <>We&apos;ve send a verification link to your email.</>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
