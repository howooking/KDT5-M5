interface SingleUserProps {
  data: CheckUser;
}

export default function SingleUser({ data }: SingleUserProps) {
  return (
    <div>
      <p>Email: {data.email}</p>
      <p>Display Name: {data.displayName}</p>
      {/* <img src={data.profileImg || ''} alt="Profile" /> */}
    </div>
  );
}
