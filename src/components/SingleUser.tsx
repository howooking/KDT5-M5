import ProfileImage from '@/components/ui/ProfileImage';

interface SingleUserProps {
  email: string;
  displayName: string;
  profileImg: string;
  index: number;
  isAdmin: boolean;
}

export default function SingleUser({
  email,
  displayName,
  profileImg,
  index,
  isAdmin,
}: SingleUserProps) {
  return (
    <tr
      className={`${
        index % 2 === 0 ? 'hover:bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <td className="py-2">
        <ProfileImage small src={profileImg || '/defaultProfile.jpg'} />
      </td>
      <td>{email}</td>
      <td>{displayName}</td>
      <td>{isAdmin ? <span className="text-accent">관리자</span> : '회원'}</td>
    </tr>
  );
}
