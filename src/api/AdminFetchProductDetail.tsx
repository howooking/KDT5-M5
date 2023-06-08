import {url, headers} from "../constants/constants.ts";
export default async function AdminFetchProductDetail(
    productId: { text: string },
) {
    try {
        console.log(productId.text)
        const res = await fetch(url + `${productId.text}`, {
            method: 'GET',
            headers
        });
        const data:ProductDetail = await res.json();
        return data;
        // if (!res.ok) {
        //     // // const productDetail:ProductDetail = res.json()
        //     // console.log(res);
        //     // // return productDetail;
        //     console.log(res);
        //     console.log(res.status);
        //     return res
        // }
    } catch (error) {
        console.log(error);
    }
}
