import ProfileImage from '@/components/ui/ProfileImage';

interface SingleUserProps {
  email: string;
  displayName: string;
  profileImg: string;
  spentMoney: number;
}

export default function SingleUser({
  email,
  displayName,
  profileImg,
  spentMoney,
}: SingleUserProps) {
  return (
    <tr>
      <td className="py-2">
        <ProfileImage small src={profileImg as string} />
      </td>
      <td>{email}</td>
      <td>{displayName}</td>
      <td>
        {spentMoney >= 300000 ? (
          spentMoney >= 500000 ? (
            <span className="font-bold text-accent">💰VVIP💰</span>
          ) : (
            <span className="font-bold text-accent">💰VIP</span>
          )
        ) : (
          '일반회원'
        )}
      </td>
    </tr>
  );
}
