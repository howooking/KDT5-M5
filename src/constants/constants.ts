// API
export const API_URL =
  'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

export const HEADERS = {
  'content-type': 'application/json',
  apikey: 'KDT5_nREmPe9B',
  username: 'KDT5_Team1',
};

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
    label: '닉네임 변경',
    href: '/myaccount/changename',
  },
  {
    label: '비밀번호 변경',
    href: '/myaccount/changepw',
  },
  // {
  //   label: '구입목록',
  //   href: '/myaccount/purchased',
  // },
];

// admin 패널 sub anvbar
export const SUB_MENUS_ADMIN = [
  {
    label: '회원관리',
    href: '/admin/clients',
  },
  {
    label: '제품관리',
    href: '/admin/products',
  },
  {
    label: '제품추가',
    href: '/admin/addproduct',
  },
];

export const SELECT_CATEGORY = [
  { name: '카테고리 선택', value: 'category' },
  { name: '축구화', value: 'soccer' },
  { name: '풋살화', value: 'footsal' },
  { name: '운동화/슬리퍼', value: 'sneakers' },
];
export const SELECT_BRAND = [
  { name: '브랜드 선택', value: 'brand' },
  { name: '나이키', value: 'nike' },
  { name: '아디다스', value: 'adidas' },
  { name: '미즈노', value: 'mizno' },
  { name: '푸마', value: 'puma' },
  { name: '기타', value: 'etc' },
];
