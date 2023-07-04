import { cleanEnv, str, port, num } from 'envalid';
/**
 * Global env handler, validator function
 */
export default cleanEnv(process.env, {
   MONGO_DB_DATABASE: str(),
   MONGO_DB_PASSWORD: str(),
   PORT: port(),
   JWT_SECRET: str(),
   JWT_EXPIRES_IN: str(),
   JWT_COOKIE_EXPIRES_IN: num(),
});
