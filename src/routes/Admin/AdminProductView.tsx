import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import AdminFetchProductAll from "../../api/AdminFetchProductAll.tsx";
import AdminFetchProductDetail from "../../api/AdminFetchProductDetail.tsx";


export default function AdminProductView() {
        const [products, setProducts] = useState<Product[]>();
        const [detailProduct, setDetailProduct] = useState<ProductDetail>();
    const [text, setText] = useState<string>('');

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setText(() => e.target.value)
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        async function fetchProductsDetail() {
            const res = await AdminFetchProductDetail({text});
            if(!res){
                return
            }
            setDetailProduct(res)
        }
        fetchProductsDetail()
        setText('')
    }

    useEffect(() => {
        async function fetchProducts() {
            const res = await AdminFetchProductAll()
            if(!res){
                return
            }
            setProducts(res)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h1 className={'text-3xl mt-4 text-orange-400'}>Admin Product 조회 - 전체 리스트 grid 형태로 스타일링 예정</h1>
            <div className={' m-4'}>
                <h2 className={'mt-10 text-2xl'}>제품 전체 조회</h2>
                <div className={'divider'}/>
                <ul className={'flex flex-col items-start border-4 border-amber-200 p-4 ' }>
                    {
                        products?.map(product => {
                        return (
                            <li key={product.id}>
                                <span className={'m-2'}>ID : {product.id}</span>
                                <span className={'m-2'}>상품명: {product.title}</span>
                                <span className={'m-2'}>가 격: {product.price}</span>
                                <span className={'m-2'}>설 명: {product.description}</span>
                            </li>
                        )
                    })}
                </ul>
                <h2 className={'mt-10 text-2xl'}>제품 상세  조회</h2>
                <div className={'divider'}/>
                <form
                    className={'w-full flex py-[1.4rem] px-[1rem] bg-[#f5f5f5]'}
                    onSubmit={handleSubmit}
                >
                    <input
                        className={'flex shrink grow basis-auto text-[1.4rem] py-[0.7rem] px-[1rem] border-0 outline-0 rounded-[8px]'}
                        type='text'
                        placeholder='조회할 ID를 입력하세요'
                        value={text}
                        onChange={handleChange}
                    />
                    <button className={'btn btn-outline btn-accent bold text-[1.4rem] ml-4 rounded-[8px]'}>Add</button>
                </form>
                <div className={'m-4 text-[20px]'}>
                   상품Id:{detailProduct?.title} 상품가격: {detailProduct?.price} 상품설명: {detailProduct?.description}
                </div>
            </div>
        </div>
    )
}


