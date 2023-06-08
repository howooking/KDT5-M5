import styles from '../routes/Admin/UserCheck.module.css';
import defaultImage from '../assets/defaultProfile.jpg';

interface SingleUserProps {
  data: CheckUser;
  index: number;
}

export default function SingleUser({ data, index }: SingleUserProps) {
  const even = index % 2 === 0 ? styles.even : '';

  const defaultImageSrc = defaultImage;

  const profileImage = data.profileImg || defaultImageSrc;

  return (
    <tr className={even}>
      <td className={styles.number}>{index}</td>
      <td className={styles.email}>{data.email}</td>
      <td className={styles.Name}>{data.displayName}</td>
      <td>
        <img src={profileImage} alt="Profile" className={styles.profileImg} />
      </td>
    </tr>
  );
}
