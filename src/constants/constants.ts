// API
export const API_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

export const HEADERS = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
};

// 이미지 슬라이더

export const SLIDES = [
  {
    id: 0,
    href: '/products/soccer/PQDbxl8TerMV7dbcHjFM',
    label: '푸마퓨쳐',
  },
  {
    id: 1,
    href: '/products/soccer/TswEFE3gibavTlGMFUuA',
    label: '아디다스포탈',
  },
  {
    id: 2,
    href: '#',
    label: '패캠',
  },
  {
    id: 3,
    href: '/products/soccer/ea3COhwuw0YHtY5ADuyg',
    label: '아디다스프레데터',
  },
  {
    id: 4,
    href: '/products/soccer/bZ5fc4ywRgWCxIJJEowC',
    label: '나이키머큐리얼',
  },
];

// 어드민 이메일 목록
export const ADMINS = [
  'admin@naver.com',
  'admin1@naver.com',
  'admin2@naver.com',
  'admin3@naver.com',
  'admin4@naver.com',
];

export const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const SUB_MENUS = [
  {
    label: '축구화',
    href: '/products/soccer',
  },
  {
    label: '풋살화',
    href: '/products/footsal',
  },
  {
    label: '운동화/슬리퍼',
    href: '/products/sneakers',
  },
];

// myAccount nav menu
export const SUB_MENUS_MYACCOUNT = [
  {
    label: '내 정보',
    href: '/myaccount/info',
  },
  {
    label: '비밀번호 변경',
    href: '/myaccount/changepw',
  },
  {
    label: '계좌 조회 / 해지',
    href: '/myaccount/accountList',
  },
  {
    label: '계좌 연결',
    href: '/myaccount/connectAccount',
  },
  {
    label: '구매 내역',
    href: '/myaccount/orderList',
  },
];

// admin 패널 sub anvbar
export const SUB_MENUS_ADMIN = [
  {
    label: '회원 정보',
    href: '/admin/clients',
  },
  {
    label: '상품 관리',
    href: '/admin/products',
  },
  {
    label: '상품 추가',
    href: '/admin/addproduct',
  },
  {
    label: '거래 내역',
    href: '/admin/alltransactions',
  },
];

export const SELECT_CATEGORY = [
  { name: '카테고리 선택*', value: 'category' },
  { name: '축구화', value: 'soccer' },
  { name: '풋살화', value: 'footsal' },
  { name: '운동화/슬리퍼', value: 'sneakers' },
];
export const SELECT_BRAND = [
  { name: '브랜드 선택*', value: 'brand' },
  { name: '나이키', value: 'nike' },
  { name: '아디다스', value: 'adidas' },
  { name: '미즈노', value: 'mizno' },
  { name: '푸마', value: 'puma' },
];

interface Translate {
  [key: string]: string;
}
export const DICTIONARY_SHOES: Translate = {
  soccer: '축구화',
  footsal: '풋살화',
  sneakers: '운동화/슬리퍼',
};

// 은행 정보
export const BANKS = [
  { name: 'KB국민은행', code: '004', digits: [3, 2, 4, 3] },
  { name: '신한은행', code: '088', digits: [3, 3, 6] },
  { name: '우리은행', code: '020', digits: [4, 3, 6] },
  { name: '하나은행', code: '081', digits: [3, 6, 5] },
  { name: '케이뱅크', code: '089', digits: [3, 3, 6] },
  { name: '카카오뱅크', code: '090', digits: [4, 2, 7] },
  { name: 'NH농협은행', code: '011', digits: [3, 4, 4, 2] },
];

// 상품 sorting 옵션
export const PRODUCT_SORT = [
  { name: '낮은가격', value: 'lowPrice' },
  { name: '높은가격', value: 'highPrice' },
];

// 상품 brand sorting 옵션
export const PRODUCT_BRAND = [
  { name: '모두', value: 'all' },
  { name: '나이키', value: 'nike' },
  { name: '아디다스', value: 'adidas' },
  { name: '미즈노', value: 'mizno' },
  { name: '푸마', value: 'puma' },
];
