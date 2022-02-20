import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import Header from 'components/Header';
import { useWallet } from 'contexts/WalletContext';

const useStyles = createUseStyles({
  connectWallet: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '64px',
    fontWeight: 700,
    justifyContent: 'center',
    letterSpacing: '3.6px',
    marginTop: '250px'
  },
  content: {
    marginBlock: '112px 0px',
    width: '100%'
  }
});

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const styles = useStyles();
  const { isConnected, isConnecting } = useWallet();
  return (
    <div>
      <Header />
      <div className={styles.content}>
        {isConnected || isConnecting ? (
          children
        ) : (
          <div className={styles.connectWallet}>Connect Wallet</div>
        )}
      </div>
    </div>
  );
}
