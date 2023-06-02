interface User {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string | null;
}
