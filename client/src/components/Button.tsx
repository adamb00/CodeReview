import React, { MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
   style: string;
   text: string;
   onClick: MouseEventHandler<HTMLButtonElement>;
   children?: React.ReactNode;
};

export default function Button({ children, onClick, style, text }: PropsWithChildren<Props>): React.ReactNode {
   return (
      <button onClick={onClick} type='submit' className={`btn btn--${style}`}>
         {children || text}
      </button>
   );
}
