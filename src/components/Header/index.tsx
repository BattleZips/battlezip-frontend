import { createUseStyles } from 'react-jss';
import headerLogo from './images/headerLogo.svg';

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
    zIndex: 10,
  },
  left: {
    alignItems: 'center',
    display: 'flex',
    gap: '19px',
  },
  loginButton: {
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #D1D2DE',
    borderRadius: '80px',
    color: '#9CA3B6',
    cursor: 'pointer',
    display: 'flex',
    letterSpacing: '2.1px',
    padding: '6px 8px',
  },
  logo: {
    heigth: '86px',
    width: '75px',
  },
  logoText: {
    fontSize: '36px',
    fontWeight: 700,
    letterSpacing: '5.4px',
    lineHieght: '52px',
  },
  separator: {
    background: '#D1D2DE',
    height: '44px',
    width: '1px',
  },
});

export default function Header(): JSX.Element {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img alt='Logo' className={styles.logo} src={headerLogo} />
        <div className={styles.separator} />
        <div className={styles.logoText}>BATTLEZIPS</div>
      </div>
      <div className={styles.loginButton}>Connet Wallet</div>
    </div>
  );
}
