interface ProfileImageProps {
  src?: string | null;
  small?: boolean;
}

export default function ProfileImage({ src, small }: ProfileImageProps) {
  return (
    <img
      src={src || '/defaultProfile.jpg'}
      alt="profile"
      className={`${
        small ? 'h-9 w-9' : 'h-60 w-60'
      } inline-block rounded-full object-cover`}
    />
  );
}
