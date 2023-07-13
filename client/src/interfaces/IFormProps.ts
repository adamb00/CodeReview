import { Dispatch, SetStateAction } from 'react';

export default interface FormProps {
   className: null | string;
   links?: boolean;
   name?: boolean | string | string[];
   lastName?: boolean | string;
   email?: boolean | string;
   photo?: boolean | Blob;
   password?: boolean | string;
   passwordConfirm?: boolean | string;
   newPassword?: boolean | string;
   setFirstName?: Dispatch<SetStateAction<string>>;
   setLastName?: Dispatch<SetStateAction<string>>;
   setEmail?: Dispatch<SetStateAction<string>>;
   setPassword?: Dispatch<SetStateAction<string>>;
   setPasswordConfirm?: Dispatch<SetStateAction<string>>;
   setNewPassword?: Dispatch<SetStateAction<string>>;
   handleForgotPassword?: () => void;
}
