import {url, headers} from "../constants/constants.ts";
    export default async function AdminFetchProductAll() {
        try {
            const res =
                await fetch(url, {
                    method: 'GET',
                    headers
                })
            if (res.ok) {
                const products: Product[] = await res.json()
                return products
            }
            const error = await res.json
            console.log(error)
        } catch (error) {
            console.log(error)
        }
    }



