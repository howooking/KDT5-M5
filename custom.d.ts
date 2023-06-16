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
  discountRate?: string;
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

//제품 수정시 사용자가 입력하는 값
interface EditProductInputData {
  title: string;
  price: string;
  description: string;
  tags: string[];
  isSoldOut: boolean;
  thumbnailBase64?: string | null;
  photoBase64?: string | null;
  discountRate?: string;
}

// 수정시 요구되는 상품 body값
interface UpdatedProduct {
  title?: string; // 제품 이름
  price?: number; // 제품 가격
  description?: string; // 제품 상세 설명
  tags?: string[]; // 제품 태그
  thumbnailBase64?: string | null; // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string | null; // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
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

interface TotalBalance {
  totalBalance: number;
  accounts: UserAccount[];
}

interface UserAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

interface ConnectAccount {
  bankCode: string; // 연결할 은행 코드 (필수!)
  accountNumber: string; // 연결할 계좌번호 (필수!)
  phoneNumber: string; // 사용자 전화번호 (필수!)
  signature: boolean; // 사용자 서명 (필수!)
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
  thumbnail: string | null; // 제품 썸네일
  photo: string | null; //상세이미지 URL
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

interface ConnectAccountBody {
  bankCode: string;
  accountNumber: string;
  phoneNumber: string;
  signature: boolean;
}

// 로그인 or 회원가입 성공하면 서버에서 오는 유져 데이터
interface UserResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string;
}

// 인증확인 성공시 응답값의 타입
interface AuthenticateResponseValue {
  email: string;
  displayName: string;
  profileImg: string | null;
}

// 사용자가 자신의 주문목록을 요청하면 받는 개별 주문정보
interface TransactionDetail {
  // 거래 내역 정보
  detailId: string; // 거래 내역 ID
  product: {
    // 거래한 제품 정보
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number; // 제품 할인율
  };
  reservation: Reservation | null; // 거래한 제품의 예약 정보
  timePaid: string; // 제품을 거래한 시간
  isCanceled: boolean; // 거래 취소 여부
  done: boolean; // 거래 완료 여부
}