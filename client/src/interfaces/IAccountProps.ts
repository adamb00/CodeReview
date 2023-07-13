import { Dispatch, SetStateAction } from 'react';

export default interface UploadUserPhotoProps {
   setShowAlert: Dispatch<SetStateAction<boolean>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setAlertType: Dispatch<SetStateAction<string>>;
   cookies?: { [key: string]: string };
}
