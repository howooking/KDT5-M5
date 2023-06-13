interface ProductDetailModalProps {
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnail?: string | null;
  photo?: string | null;
  isSoldOut?: boolean;
  discountRate?: number;
}

export default function ProductDetailModal({
  title,
  price,
  description,
  tags,
  photo,
  isSoldOut,
  discountRate,
}: ProductDetailModalProps) {
  return (
    <dialog id="my_modal_2" className="modal">
      <form method="dialog" className="space-y-1">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-3xl text-accent">{price}원</div>
        <div>{discountRate} %</div>
        <div>{isSoldOut ? '재고 없슴' : '재고 있슴'}</div>
        <div className="mb-2 flex flex-col">{description}</div>
        <img src={photo || '/dafaultThumb.jpg'} alt="상세사진" />
      </form>
      {/* 외부 클릭시 닫힘 */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
