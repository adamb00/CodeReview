import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppContext } from './contexts/AppContext.tsx';
import { LoginContext } from './contexts/LoginContext.tsx';
import { PostContext } from './contexts/PostContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <AppContext>
         <LoginContext>
            <PostContext>
               <App />
            </PostContext>
         </LoginContext>
      </AppContext>
   </React.StrictMode>
);
