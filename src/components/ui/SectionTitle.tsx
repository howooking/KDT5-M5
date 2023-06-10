export default function SectionTitle({ text }: { text?: string }) {
  return <div className="text-3xl font-bold">{text || '모든상품'}</div>;
}
