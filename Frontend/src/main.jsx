import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext.jsx';
import CaptainContext from './Context/CaptainContext.jsx';
import SocketContextProvider from './Context/SocketContext.jsx'; // new import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <SocketContextProvider> {/* added provider */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketContextProvider>
      </UserContext>
    </CaptainContext>
  </StrictMode>,
)
