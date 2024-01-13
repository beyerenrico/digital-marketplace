'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = ({}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AuthCredentialsValidator>>({
    resolver: zodResolver(AuthCredentialsValidator),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === 'CONFLICT') {
        toast.error('This email is already in use.');

        return;
      }

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);

        return;
      }

      toast.error('Something went wrong. Please try again.');
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`We've sent a verification link to ${sentToEmail}.`);

      router.push('/verify-email?to=' + sentToEmail);
    }
  });

  function onSubmit ({ email, password }: z.infer<typeof AuthCredentialsValidator>) {
    mutate({ email, password });
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Logo />
            <h1 className='text-2xl font-bold'>
              Create an Account
            </h1>
            <Link
              className={buttonVariants({ variant: 'link' })}
              href='/sign-in'
            >
              Already have an account? Sign in &rarr;
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
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
