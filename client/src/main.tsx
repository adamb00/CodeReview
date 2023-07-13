import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppContext } from './contexts/AppContext.tsx';
import { LoginContext } from './contexts/LoginContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <AppContext>
         <LoginContext>
            <App />
         </LoginContext>
      </AppContext>
   </React.StrictMode>
);
