'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodError } from 'zod';

import Logo from '@/components/logo';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthCredentialsValidator } from '@/lib/validations/authentication';
import { trpc } from '@/trpc/client';

type SigninPageProps = {};

const SigninPage: React.FC<SigninPageProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push('?as=seller');
  };

  const continueAsCustomer = () => {
    router.replace('/sign-in', undefined);
  };

  const form = useForm<z.infer<typeof AuthCredentialsValidator>>({
    resolver: zodResolver(AuthCredentialsValidator),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (error) => {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid credentials');
        return;
      }
    },
    onSuccess: () => {
      toast.success('Welcome back!');

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push('/sell');
        return;
      }

      router.push('/');
      router.refresh();
    }
  });

  function onSubmit ({ email, password }: z.infer<typeof AuthCredentialsValidator>) {
    signIn({ email, password });
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Logo />
            <h1 className='text-2xl font-bold'>
              Sign in to your {isSeller ? 'seller' : ''} account
            </h1>
            <Link
              className={buttonVariants({ variant: 'link' })}
              href='/sign-up'
            >
              Don&apos;t have an account? Sign up &rarr;
            </Link>
          </div>

          <div className='grid gap-6'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    disabled={isLoading}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='space-y-0'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='you@example.com'
                            type='email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    disabled={isLoading}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='space-y-0'>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='********'
                            type='password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className='mt-2 gap-2'
                    isLoading={isLoading}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>

            <div className='relative'>
              <div
                aria-hidden={true}
                className='absolute inset-0 flex items-center'
              >
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                disabled={isLoading}
                onClick={continueAsCustomer}
                variant='secondary'
              >Continue as customer
              </Button>
            ) : (
              <Button
                disabled={isLoading}
                onClick={continueAsSeller}
                variant='secondary'
              >Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
