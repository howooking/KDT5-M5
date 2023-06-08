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
        if (!res.ok) {
            const productDetail:ProductDetail = await res.json()
            console.log(productDetail);
            return productDetail;
        }
    } catch (error) {
        console.log(error);
    }
}
