

interface User {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string | null;
  isAdmin: boolean;
}

//제품 추가시 사용자가 입력하는 값
interface ProductInputData {
  title: string;
  price: string;
  description: string;
  tags: string[];
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
  isSoldOut: boolean;
}

// 실제 제품 추가시 요구되는 값
interface AddProductData {
  title: string;
  price: number;
  description: string;
  tags?: string[];
  thumbnailBase64?: string;
  photoBase64?: string;
  discountRate?: number;
}

interface UpdatedProduct {
  title?: string; // 제품 이름
  price?: number; // 제품 가격
  description?: string; // 제품 상세 설명
  tags?: string[]; // 제품 태그
  thumbnailBase64?: string; // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string; // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  isSoldOut?: boolean; // 제품 매진 여부
  discountRate?: number; // 제품 할인율
}




interface ProductId {
  productId: string;
}

interface Bank {
  name: string;
  code: string;
  digits: number[];
  disabled: boolean;
}

interface UserAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

interface TotalBalance {
  totalBalance: number;
  accounts: UserAccount[];
}

// 어드민에서 사용자들 정보를 조회할 때 오는 사용자 정보 타입
interface CheckUser {
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

interface ProductDetail {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[]; // 제품 태그
  thumbnail?: string; // 제품 썸네일
  photo?: string; //상세이미지 URL
  isSoldOut: boolean; // 제품 매진여부
  discountRate: number;
}
interface Product {
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 설명(최대 100자)
  tags: string[]; // 제품 태그
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  discountRate: number; // 제품 할인율
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  my_modal_2: any;
}
