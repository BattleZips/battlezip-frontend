import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Toaster containerStyle={{ right: '80%' }} />
        <Routes />
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
