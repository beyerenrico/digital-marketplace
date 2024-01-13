'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/payload-types';

type UserAccountMenuProps = {
  user: User
};

const UserAccountMenu: React.FC<UserAccountMenuProps> = ({ user }) => {
  const { signOut } = useAuth();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size='sm'
            variant='ghost'
          >My Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            asChild
            className='cursor-pointer'
          >
            <Link href='/sell'>
              Seller Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={signOut}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccountMenu;
