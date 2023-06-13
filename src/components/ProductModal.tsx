export const productModal = (detailProduct:ProductDetail) => {
  return (
    <div>
      <dialog id="productModal" className="modal">
        <form
          method="dialog"
          className="modal-box h-auto w-[60%] max-w-5xl text-[20px]"
        >
          <h3 className="text-lg font-bold">제품상세조회</h3>
          <div className={'m-4 flex flex-col items-start justify-center'}>
            <label htmlFor={'thumbnail'} className={'mb-2'}>
              제품 이름 :{'  '}
              <input
                type="text"
                value={detailProduct?.title}
                className={
                  'input-bordered input-accent input w-[600px] text-xl'
                }
                name={'thumbnail'}
              />
            </label>
            <label htmlFor={'price'} className={'mb-2'}>
              제품 가격 :{'  '}
              <input
                type="text"
                value={detailProduct?.price}
                className={
                  'input-bordered input-accent input w-[100px] text-xl'
                }
                name={'price'}
              />{' '}
              원
            </label>
            <label htmlFor={'soldOut'} className="label cursor-pointer">
              상품 매진 :{' '}
              <input
                type="checkbox"
                checked={detailProduct?.isSoldOut}
                name={'soldOut'}
                className="checkbox"
              />
            </label>
            <label htmlFor={'discountRate'} className="label cursor-pointer">
              할인률 :{' '}
              <input
                type="text"
                value={detailProduct?.discountRate}
                name={'discountRate'}
                className="input-bordered input-accent input w-[100px] text-xl"
              />
              %
            </label>
          </div>
          <div className={'flex flex-col items-center justify-center'}>
            <textarea value={detailProduct?.description} className={'textarea textarea-accent w-[80%]  text-xl'} />
            <img src={detailProduct?.photo} alt='상세사진' />
          </div>
        </form>
        <div className={'divider'} />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>

  );
};