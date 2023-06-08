export default function LoadingSpinner({
  color,
}: {
  color: 'white' | 'accent';
}) {
  return <div className={`loading-${color}`}></div>;
}
