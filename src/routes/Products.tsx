import useUser from '../hooks/useUser';

export default function Products() {
  const { userInfo } = useUser();

  return <div>{userInfo.user.email}</div>;
}
