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
    href: 'soccer',
  },
  {
    label: '풋살화',
    href: 'footsal',
  },
  {
    label: '족구',
    href: 'footvolley',
  },
  {
    label: '운동화',
    href: 'sneakers',
  },
  {
    label: '의류',
    href: 'wear',
  },
];

// myAccount nav menu
export const SUB_MENUS_MYACCOUNT = [
  {
    label: '닉네임 변경',
    href: '/myaccount/changename',
  },
  {
    label: '비밀번호 변경',
    href: '/myaccount/changepw',
  },
  {
    label: '구입목록',
    href: '/myaccount/purchased',
  },
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

const SELECT_CATEGORY = [
  { name: '축구화', value: 'soccer' },
  { name: '풋살화', value: 'footsal' },
  { name: '족구화', value: 'footvolley' },
  { name: '운동화', value: 'sneakers' },
  { name: '의류', value: 'wear' },
];
