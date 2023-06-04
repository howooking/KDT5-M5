// import { useEffect } from 'react';
// import { userStore } from '../store';

// export default function useUser(): {
//   userInfo: User;
//   logoutUser: () => void;
//   // isAdmin: boolean;
// } {
//   const accessToken = localStorage.getItem('token');
//   const { userInfo, authMe, logoutUser } = userStore();
//   // const isAdmin = userInfo.user.email === 'admin@naver.com';

//   useEffect(() => {
//     if (accessToken === null) {
//       logoutUser();
//     } else {
//       authMe(accessToken);
//     }
//   }, [accessToken, authMe, logoutUser]);

//   return { userInfo, logoutUser };
// }
