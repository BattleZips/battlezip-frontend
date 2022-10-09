import { useWallet } from 'contexts/WalletContext';
import { createUseStyles } from 'react-jss';
import headerLogo from './images/headerLogo.svg';
import { formatAddress } from 'utils';
import Avatar from 'components/Avatar';

const useStyles = createUseStyles({
  container: {
    alignItems: 'center',
    background: '#F5F5F5',
    display: 'flex',
    height: '122px',
    justifyContent: 'space-between',
    left: 0,
    paddingInline: '54px',
    position: 'fixed',
    top: 0,
    width: 'calc(100% - 108px)',
    zIndex: 10
  },
  docs: {
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600
  },
  left: {
    alignItems: 'center',
    display: 'flex',
    gap: '19px'
  },
  loginButton: {
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #D1D2DE',
    borderRadius: '80px',
    color: '#9CA3B6',
    cursor: 'pointer',
    display: 'flex',
    gap: '8px',
    letterSpacing: '2.1px',
    padding: '6px 8px'
  },
  logo: {
    heigth: '86px',
    width: '75px'
  },
  logoText: {
    fontSize: '36px',
    fontWeight: 700,
    letterSpacing: '5.4px',
    lineHieght: '52px'
  },
  right: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px'
  },
  separator: {
    background: '#D1D2DE',
    height: '44px',
    width: '1px'
  }
});

export default function Header(): JSX.Element {
  const styles = useStyles();
  const {
    address,
    connectWallet,
    disconnect,
    ensName,
    isConnected,
    isConnecting
  } = useWallet();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img alt="Logo" className={styles.logo} src={headerLogo} />
        <div className={styles.separator} />
        <div className={styles.logoText}>BATTLEZIPS</div>
      </div>
      <div className={styles.right}>
        <div
          className={styles.docs}
          onClick={() =>
            window.open('https://battlezips.gitbook.io/battlezips')
          }
        >
          Docs
        </div>
        <div
          className={styles.loginButton}
          onClick={() =>
            !isConnecting && (!isConnected ? connectWallet() : disconnect())
          }
        >
          {address && <Avatar address={address} />}
          <div>
            {isConnected
              ? formatAddress(address, ensName)
              : isConnecting
              ? 'Connecting...'
              : 'Connect'}
          </div>
        </div>
      </div>
    </div>
  );
}
