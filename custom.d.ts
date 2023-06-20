// !!Auth관련 타입들

// 로그인 요청시 or 회원가입 요청시 성공하면 서버에서 오는 유져 데이터
interface UserResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string;
}

// 수정에 성공하면 서버에서 보내주는 유져값
interface UpdatedUserResponseValue {
  email: string;
  displayName: string;
  profileImg: string | null;
}

interface LocalUser {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string | null;
  isAdmin: boolean;
}

// !! 어드민 관리 관련 api

// 어드민에서 사용자들 정보를 조회할 때 오는 사용자 정보 타입
interface Client {
  email: string; // 사용자 아이디
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}
interface SpentMoneyIncludedClient extends Client {
  spentMoney: number;
}

// 상품 추가시 서버로 부터 받는 응답
interface AddProductResponseValue {
  id: string;
  title: string;
  price: number;
  description: string;
  tags: string[];
  thumbnail: string | null;
  photo: string | null;
  isSoldOut: boolean;
  discountRate: number;
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

//제품 수정시 사용자가 입력하는 값
interface EditProductInputData {
  title: string;
  price: string;
  description: string;
  tags: string[];
  isSoldOut: string;
  thumbnailBase64?: string | null;
  photoBase64?: string | null;
  discountRate?: string;
}

// 실제 수정시 요구되는 값
interface UpdateProductBodyData {
  title?: string;
  price?: number;
  description?: string;
  tags?: string[];
  thumbnailBase64?: string | null;
  photoBase64?: string | null;
  isSoldOut?: boolean;
  discountRate?: number;
}

// 수정시 서버로 부터 받는 수정된 상품 값
interface UpdatedProduct {
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 상세 설명
  tags: string[]; // 제품 태그
  thumbnail: string | null; // 제품 썸네일 이미지(URL)
  photo: string | null; // 제품 상세 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  discountRate: number; // 제품 할인율
}

// 거래 세부 내역
interface TransactionDetail {
  detailId: string;
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  account: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
  };
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number;
  };
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}

interface Bank {
  name: string;
  code: string;
  digits: number[];
  disabled: boolean;
}

interface AccountsAndBalance {
  totalBalance: number;
  accounts: UserAccount[];
}
interface UserAccount {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
  delete?: boolean;
}

interface ConnectAccount {
  bankCode: string; // 연결할 은행 코드 (필수!)
  accountNumber: string; // 연결할 계좌번호 (필수!)
  phoneNumber: string; // 사용자 전화번호 (필수!)
  signature: boolean; // 사용자 서명 (필수!)
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

// 관리자패널에서 상품 목록 조회시 개별 상품
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

// 인증확인 성공시 응답값의 타입
interface AuthenticateResponseValue {
  email: string;
  displayName: string;
  profileImg: string | null;
}

// 사용자가 자신의 주문목록을 요청하면 받는 개별 주문정보
interface TransactionDetail {
  detailId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    discountRate: number;
  };
  reservation: Reservation | null;
  timePaid: string;
  isCanceled: boolean;
  done: boolean;
}
