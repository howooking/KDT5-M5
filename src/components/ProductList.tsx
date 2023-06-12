export default function ProductList(products:Product[]) {
  console.log(products)
  return (
    <div className={'m-4 border-2 border-red-300'}>
      <h2 className={'mb-8 mt-10 text-2xl'}>제품 전체 조회</h2>
      <div className={'divider'} />
      <div>
        <button className={'btn-info btn mr-4 w-[200px] text-2xl'}>
          제품 추가
        </button>
      </div>
      <div className={'divider'} />
      <table
        className={
          'table-zebra mx-auto table w-[90%] table-fixed border-spacing-4 text-center text-xl'
        }
      >
        <thead>
        <tr className={'bold text-center text-2xl'}>
          {/*<th >제품ID</th>*/}
          <th>썸네일이미지</th>
          <th>상품명</th>
          <th>상품가격</th>
          <th>상품설명</th>
          <th>제품테그</th>
          <th>매진여부</th>
          <th>할인율</th>
        </tr>
        </thead>
        <tbody>
        {products?.map((product) => {
          return (
            <tr className={'p-2'}>
              {/*<td>{product.id}</td>*/}
              <td>
                <img
                  // src={product.thumbnail}
                  // src={image}
                  className={'w-[100px]'}
                  alt="썸네일"
                />
              </td>
              <td>
                <p className={'... overflow-hidden truncate'}>
                  {product.title}
                </p>
              </td>
              <td>{product.price} 원</td>
              <td>
                <p className={'... overflow-hidden truncate'}>
                  {product.description}
                </p>
              </td>
              <td>{product.tags}</td>
              <td className={'w-[100px]'}>{product.isSoldOut}</td>
              <td className={'w-[100px]'}>{product.discountRate}</td>
              {/*<td>
                <button
                  className={'btn-primary btn pb-0 text-xl'}
                  onClick={handleSearch}
                  value={product.id}
                >
                  조회
                </button>
                <button className={'btn text-xl'} onClick={handleUpdate}>
                  수정
                </button>
                <button
                  className={'btn-info btn text-xl'}
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </td>*/}
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  )
}
