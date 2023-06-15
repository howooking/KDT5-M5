// 제품 거래와 관련된 api

import { API_URL, HEADERS } from "@/constants/constants"

export const getproduct = async(
  searchTerm: {
    searchText?: string,
    // searchTags?: string[]
  }
) => {
  try {
    const res = await fetch(`${API_URL}/products/search`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        searchText: searchTerm.searchText,
        // searchTags: searchTerm.searchTags
    })
    })
    if (res.ok) {
      const productSeach: Product = await res.json()
      console.log(productSeach);
      return productSeach
    }
  } catch (error) {
    console.error('검색 요청에 실패했습니다.', error);
  }
}
