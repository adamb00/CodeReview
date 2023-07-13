import { MouseEventHandler } from 'react';

export type ButtonProps = {
   style: string;
   text: string;
   onClick: MouseEventHandler<HTMLButtonElement>;
   children?: React.ReactNode;
};
