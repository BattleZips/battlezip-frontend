import makeBlockie from 'ethereum-blockies-base64';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  avatar: {
    borderRadius: '50%',
    height: '33px',
    width: '33px'
  }
});

type AvatarProps = {
  address: string;
  image?: string;
};

export default function Avatar({ address, image }: AvatarProps): JSX.Element {
  const styles = useStyles();
  return (
    <img
      alt={address}
      className={styles.avatar}
      src={image || makeBlockie(address)}
    />
  );
}
