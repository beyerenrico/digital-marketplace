import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token, user: { email } }) => {
        return `
          <a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Verify your account</a>
        `;
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      // admin: {
      //   condition: () => false,
      // },
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'User',
          value: 'user'
        }
      ]
    }
  ]
};
