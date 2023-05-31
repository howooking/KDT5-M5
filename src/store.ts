import { create } from 'zustand';

interface UserState {
  userInfo: User;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

const userStore = create<UserState>((set) => ({
  userInfo: {
    user: {
      email: '',
      displayName: '',
      profileImg: '',
    },
    accessToken: '',
  },
  setUser: (user) =>
    set(() => ({
      userInfo: user,
    })),
  logoutUser: () =>
    set({
      userInfo: {
        user: {
          email: '',
          displayName: '',
          profileImg: '',
        },
        accessToken: '',
      },
    }),
}));

// export default function SignUp() {
//   const bears = useStore((state) => state.bears);
//   const increasePopulation = useStore((state) => state.increasePopulation);
//   const removeAllBears = useStore((state) => state.removeAllBears);
//   return (
//     <>
//       <h1>{bears} around here...</h1>
//       <button onClick={increasePopulation}>one up</button>
//       <button onClick={removeAllBears}>re</button>
//     </>
//   );
// }

export default userStore;
