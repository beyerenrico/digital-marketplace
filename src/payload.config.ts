import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import dotenv from 'dotenv';
import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/users';

dotenv.config({
  path: path.resolve(__dirname, '.env')
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  collections: [Users],
  routes: {
    admin: '/sell'
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- DigitalMarketplace',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    }
  },
  rateLimit: {
    max: process.env.NODE_ENV === 'production' ? 500 : 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
});
