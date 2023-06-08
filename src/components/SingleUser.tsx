import styles from '../routes/Admin/UserCheck.module.css';

interface SingleUserProps {
  data: CheckUser;
  index: number;
}

export default function SingleUser({ data, index }: SingleUserProps) {
  const even = index % 2 === 0 ? styles.even : '';
  
  return (
    <tr className={even}>
      <td>{index}</td>
      <td>{data.email}</td>
      <td>{data.displayName}</td>
    </tr>
  );
}