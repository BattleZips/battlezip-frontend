import Routes from 'Routes';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
