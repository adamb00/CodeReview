import 'dotenv/config';

import { Application } from 'express';
import mongoose from 'mongoose';

import env from './utils/validateEnv';
import App from './app';

class Server {
   constructor() {
      this.connectToServer();
   }

   /**
    * Function to connect the server, sends error message, needs property from env
    * @property {number} PORT
    * @property {string} MONGO_DB_DATABASE
    * @property {string} MONGO_DB_PASSWORD
    */
   private connectToServer(): void {
      process.on('uncaughtException', (err: Error) => {
         console.log('UNCAUGHT EXCEPTION! 💥 Shutting down..');
         console.log(err.name, err.message);
         process.exit(1);
      });

      const app: Application = new App().app;
      const DB = env.MONGO_DB_DATABASE.replace('<PASSWORD>', env.MONGO_DB_PASSWORD);

      mongoose.connect(DB).then(() => console.log('DB connection successful!'));

      const port = process.env.PORT || 3001;

      const server = app.listen(port, () => {
         console.log(`App running on port ${port}...`);
      });

      process.on('unhandledRejection', (err: Error) => {
         console.log('UNHANDLED REJECTION! 💥 Shutting down..');
         console.log(err.name, err.message);
         server.close(() => {
            process.exit(1);
         });
      });

      process.on('SIGTERM', () => {
         console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
         server.close(() => {
            console.log('💥 Process terminated!');
         });
      });
   }
}

new Server();
