import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) new Error('Failed to sign out');

      toast.success('Signed out');

      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      toast.error('Couldn\'t sign out');
    }
  };

  return {
    signOut,
  };
};
