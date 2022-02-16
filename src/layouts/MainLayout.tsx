import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import Header from 'components/Header';

const useStyles = createUseStyles({
  content: {
    marginBottom: '40px',
    minHeight: 'calc(100vh - 112px)',
    width: '100%',
  },
});

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const styles = useStyles();
  return (
    <div>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
