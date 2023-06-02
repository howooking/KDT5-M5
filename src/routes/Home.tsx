import useUser from '../hooks/useUser';

export default function Home() {
  const { userInfo } = useUser();
  return <div>{userInfo.user.displayName}</div>;
}
