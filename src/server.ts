import express from 'express';
import payload from 'payload';
import { getPayloadClient } from './get-payload';
import { nextApp, nextHandler } from './next-utils';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payloadClient = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Payload CMS is running on ${cms.getAdminURL()}`);
      }
    }
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js is ready');

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
