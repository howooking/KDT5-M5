import { useState } from 'react';
import { userCheck } from '../../api/adminApi';
import SingleUser from '../../components/SingleUser';

interface UserData {
  email: string;
  displayName: string;
  profileImg: string;
}

function UserCheck() {
  const [checkData, setCheckData] = useState<UserData[]>([]);

  const handleClick = async () => {
    const data: UserData[] = await userCheck();
    setCheckData(data);
    console.log(data)
  }

  return (
    <div>
      <h3>유저 조회</h3>
      <button onClick={handleClick}>유저 조회 버튼</button> 

      {checkData.map((data) => (
        <SingleUser key={data.email} data = {data} />
      ))}
    </div>
  );
}

export default UserCheck;
