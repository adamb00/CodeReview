import React, { PropsWithChildren } from 'react';

import { ButtonProps } from '../interfaces/IButtonProps';

export default function Button({ children, onClick, style, text }: PropsWithChildren<ButtonProps>): React.ReactNode {
   return (
      <button onClick={onClick} type='submit' className={`btn btn--${style}`}>
         {children || text}
      </button>
   );
}
