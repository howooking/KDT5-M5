import {url, headers} from "./constants.ts";
export default async function AdminFetchProductDetail(
    productId: { text: string },
) {
    try {
        const res = await fetch(url + `${productId.text}`, {
            method: 'GET',
            headers
        });
        if (res.ok) {
            const productDetail:ProductDetail = await res.json()
            return productDetail;
        }
    } catch (error) {
        console.log(error);
    }
}
