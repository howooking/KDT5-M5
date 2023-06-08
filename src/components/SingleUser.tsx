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
        <img
          src={profileImg || '/defaultProfile.jpg'}
          alt="Profile"
          className="mx-auto inline-block h-8 w-8 rounded-full object-cover"
        />
      </td>
      <td>{email}</td>
      <td>{displayName}</td>
      <td>{isAdmin ? <span className="text-accent">관리자</span> : '회원'}</td>
    </tr>
  );
}
