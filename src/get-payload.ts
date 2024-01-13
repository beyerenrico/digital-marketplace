import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import payload, { Payload } from 'payload';
import { type InitOptions } from 'payload/config';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY
  }
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null
  };
}

type Args = {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required');
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        fromName: process.env.RESEND_FROM_NAME || 'DigitalMarketplace'
      },
      secret: process.env.PAYLOAD_SECRET,
      local: !initOptions?.express,
      ...(initOptions || {})
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.client;
};
