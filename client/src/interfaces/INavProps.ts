import { CookieGetOptions } from 'universal-cookie';

export default interface NavProps {
   removeCookie: (name: string, options?: CookieGetOptions) => void;
   className?: string;
}
