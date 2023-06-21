# 🤝 패스트캠퍼스 FE5 쇼핑몰 팀프로젝트

<p align="center">
  <img src="https://github.com/howooking/fastcampus-KDT5-M3/assets/87072568/547f1fe5-0b71-4796-abac-6c7e86075dba"><br>
  <a href="https://hits.seeyoufarm.com">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fhowooking%2FKDT5-M5&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" alt="Hits">
  </a>
</p>

> 본 프로젝트는 패스트캠퍼스 부트캠프 프론트앤드 5기, 5차 과제입니다.  
> 저희 1조는 주어진 API로 축구화 온라인 쇼핑몰을 제작하였습니다.  
> 개발 기간 : 2023. 5. 31 ~ 2023. 6. 21

<br><br>

# 배포주소

https://kdt-5-m5-crazy11.vercel.app
<br><br>

# 개발팀 소개

|  팀원  |                  정승원                   |                      박현준                      |                    최용준                    |                      황인승                      |                   이정우                   |
| :----: | :---------------------------------------: | :----------------------------------------------: | :------------------------------------------: | :----------------------------------------------: | :----------------------------------------: |
| 깃허브 | [@바꿔야함](https://github.com/howooking) | [@HyunJunPark0](https://github.com/HyunJunPark0) | [@PelicanStd](https://github.com/PelicanStd) | [@hwanginseung](https://github.com/hwanginseung) | [@howooking](https://github.com/howooking) |
|  담당  |  회원정보<br>상품 상세페이지<br>구매확정  |      개인정보 수정<br>구매내역<br>구매취소       |     상품 관리<br>상품 추가<br>상품 수정      |          계좌<br>거래내역<br>상품 검색           |    인증, 인가<br>상품 배치<br>스타일링     |

<br><br>

# 시작 가이드

## Installation

```cli
$ git clone https://github.com/howooking/KDT5-M5
$ cd KDT5-M5
$ npm install
$ npm run dev
```

> 백앤드 서버 실행은 불필요합니다.

<br><br>

# 사용한 기술, 라이브러리

## Environment

<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/><br>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white"/><br>
<img src="https://img.shields.io/badge/GIT HUB-181717?style=flat&logo=github&logoColor=white"/><br>

## Config

<img src="https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white"/><br>
<img src="https://img.shields.io/badge/VITE-646CFF?style=flat&logo=vite&logoColor=white"/><br>

## Development

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/><br>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/><br>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/><br>
<img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=reactrouter&logoColor=white"/> <br>
zustand : 전역 상태관리<br>
react-hot-toast : 팝업 안내 메시지<br>
nuka-carousel : 이미지 슬라이더<br>
<br><br>

# 화면 구성

|                                                                                                                                                                                       |                                                                                                                                                                                       |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                      메인페이지                                                                                       |                                                                                       모든제품                                                                                        |
|                     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/main.png" width="400"/>                      |     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EB%AA%A8%EB%93%A0%EC%A0%9C%ED%92%88.png" width="400"/>      |
|                                                                                    카테고리별 상품                                                                                    |                                                                                       상품 검색                                                                                       |
| <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/15934011c83bd52b28b65bd16dccca61a2fa7ceb/public/readme/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%EB%B3%84.png" width="400"/> |              <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B2%80%EC%83%89.png" width="400"/>               |
|                                                                                    연관 상품 추천                                                                                     |                                                                                   상품 상세 페이지                                                                                    |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/15934011c83bd52b28b65bd16dccca61a2fa7ceb/public/readme/%EC%97%B0%EA%B4%80%EC%83%81%ED%92%88.png" width="400"/>      | <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png" width="400"/> |
|                                                                                       회원 정보                                                                                       |                                                                                       상품 관리                                                                                       |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4.png" width="400"/>      |     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%ED%92%88%EA%B4%80%EB%A6%AC.png" width="400"/>      |
|                                                                                       상품 추가                                                                                       |                                                                                       상품 수정                                                                                       |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%ED%92%88%EC%B6%94%EA%B0%80.png" width="400"/>      |                        <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%EC%83%81%ED%92%88%EC%88%98%EC%A0%95.png?raw=true" width="400"/>                        |
|                                                                                       거래 내역                                                                                       |                                                                                        내 정보                                                                                        |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B1%B0%EB%9E%98%EB%82%B4%EC%97%AD.png" width="400"/>      |          <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EB%82%B4%EC%A0%95%EB%B3%B4.png" width="400"/>          |
|                                                                                   계좌 조회 / 해지                                                                                    |                                                                                       계좌 연결                                                                                       |
|    <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B3%84%EC%A2%8C%20%EC%A1%B0%ED%9A%8C.png" width="400"/>    |     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B3%84%EC%A2%8C%EC%97%B0%EA%B2%B0.png" width="400"/>      |
|                                                                                       구매 내역                                                                                       |                                                                                       로딩화면                                                                                        |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B5%AC%EB%A7%A4%EB%82%B4%EC%97%AD.png" width="400"/>      |              <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EB%A1%9C%EB%94%A9.gif" width="400"/>               |
|                                                                                        로그인                                                                                         |                                                                                       회원가입                                                                                        |
|                            <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png?raw=true" width="400"/>                             |                        <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png?raw=true" width="400"/>                        |

# 고찰

- 상태관리 툴

  - 상대적으로 사용이 쉬운 [ZUSTAND](https://zustand-demo.pmnd.rs/)를 사용

    ```js
    (src/store.ts)
    import { create } from 'zustand';
    import { authenticate } from '@/api/authApi';
    import { ADMINS } from '@/constants/constants';

    interface UserState {
      userInfo: LocalUser | null;
      setUser: (user: LocalUser | null) => void;
      authMe: () => Promise<string | undefined>;
    }

    export const userStore = create<UserState>((set) => ({
      userInfo: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null,

      setUser: (user: LocalUser | null) =>
        set({
          userInfo: user,
        }),

      authMe: async () => {
        const userInfo: LocalUser | null = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user') as string)
          : null;
        if (!userInfo) {
          set({
            userInfo: null,
          });
          return '로그인을 해주세요.';
        }
        const res = await authenticate(userInfo.accessToken);
        if (res.statusCode === 200) {
          const user = res.data as AuthenticateResponseValue;
          const isAdmin = ADMINS.includes(user.email);
          set({
            userInfo: {
              user: user,
              accessToken: userInfo.accessToken,
              isAdmin,
            },
          });
          return;
        }
        set({
          userInfo: null,
        });
        localStorage.removeItem('user');
        return '로그인 하신지 24시간이 지나셨어요! 다시 로그인해주세요.';
      },
    }));


    (필요한 곳에서 사용)
    import { userStore } from '@/store';
    const { userInfo, setUser } = userStore();
    ```

- 관리자 확인

  - 로그인 시 서버로 부터 받는 데이터는 아래와 같으며 해당 정보로는 관리자 여부를 알 수 없다.

    ```ts
    interface ResponseValue {
      user: {
        email: string;
        displayName: string;
        profileImg: string | null;
      };
      accessToken: string;
    }
    ```

  - 따라서 클라이언트 단에서 관리자 여부를 확인하고 isAdmin이라는 property를 추가하여 전역 User 상태와 로컬저장소에 저장한다.

    ```ts
    interface LocalUser {
      user: {
        email: string;
        displayName: string;
        profileImg: string | null;
      };
      accessToken: string;
      isAdmin: boolean;
    }
    ```

  - 그러나 이 방법은 보안상 취약하지만 다음과 같은 대응 전략을 세울 수 있다.

    - 비건전한 사용자가 local storage에 접근하여 isAdmin을 true로 바꿀 경우<br> 👉 관리자만 접근 할 수 있는 route 분기점에 인증 api를 사용하여 사용자의 신원을 확인한다.

      ```js
      export default function Admin() {
        const { authMe } = userStore();
        useEffect(() => {
          async function auth() {
            const errorMessage = await authMe();
            if (errorMessage) {
              toast.error(errorMessage, { id: 'authMe' });
            }
          }
          auth();
        }, []);
        return (
          <>
            <SubNavbar menus={SUB_MENUS_ADMIN} gray />
            <Outlet />
          </>
        );
      }
      ```

    - 비건전한 사용자가 파일에 저장된 관리자 이메일 주소를 보는 경우<br>👉 관리자의 메일 주소를 알더라도 비밀번호는 모르니 괜찮다. 그래도 불안하면 환경변수에 저장하는 방법이 있다.

- 부족한 상품 정보

  - 상품의 스키마는 아래와 같으며 해당 프로젝트에서 필요한 'category'와 'brand' 항목이 없다.
    ```ts
    interface Product {
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
    ```
  - 따라서 tags 항목에서 배열의 첫번째 요소를 category, 두번째 요소를 brand로 지정하였다.

    ```js
    tags: ['soccer', 'nike'],
    ```

- 라우트 보호

  - 로그인 상태, 관리자 여부에 따라서 접근할 수 있는 페이지를 제한해야 한다.
  - ProdtectedRoute에서 전역 User 상태와 adminRequired props 속성에 따라서 접근을 제한할 수 있다.

    ```js
    import { Navigate } from 'react-router-dom';
    import { userStore } from '@/store';

    type ProtectedRouteProps = {
      element: React.ReactNode,
      adminRequired?: boolean,
    };

    export default function ProtectedRoute({
      element,
      adminRequired,
    }: ProtectedRouteProps) {
      const { userInfo } = userStore();

      if (!userInfo) {
        return <Navigate to="/login" replace />;
      }
      if (adminRequired && !userInfo.isAdmin) {
        return <Navigate to="/" replace />;
      }
      return <>{element}</>;
    }
    ```

- 상태에 따른 UI 동적 구현
  - 관리자
    - 관리자의 경우 Navbar에 "관리자" 버튼이 보인다.
    - 관리자의 경우 로그인시 "주인님 오셨습니다" 알림 메세지가 출력된다.
    - 관리자의 경우 상품 상세 페이지에서 상품 수정 아이콘이 보인다.
  - 로그인
    - 로그인하지 않은 경우 상품 상세 페이지에서 결제 버튼 대신 "로그인 하러가기" 버튼이 보인다.
    - 로그인을 한 경우 login 페이지와 signup 페이지에 접근 할 수 없다.
  - 계좌
    - 계좌를 하나도 등록하지 않은 경우 상품 상세 페이지에서 "원클린 간편 결제" 버튼 대신 "계좌 등록하러 가기" 버튼이 보인다.
    - 계좌 연결 페이지에서 은행을 선택시 선택한 은행의 계좌번호의 갯수를 알려주며 그 수를 input 요소의 maxLength로 지정한다.
  - 상품
    - 상품 상세 페이지 하단에 해당 상품과 같은 카테고리에 있는 제품 10개를 랜덤으로 추천한다.
    - 상품이 매진인 경우 "SOLD OUT" 이미지를 상품 이미지 위에 표시
      <br><br>

# 디렉토리 구조

```
┣ 📂public
┃ ┣ 📂products
┃ ┣ 📂readme
┃ ┣ 📂slider
┣ 📂src
┃ ┣ 📂api
┃ ┃ ┣ 📜adminApi.ts
┃ ┃ ┣ 📜authApi.ts
┃ ┃ ┣ 📜bankApi.ts
┃ ┃ ┗ 📜transactionApi.ts
┃ ┣ 📂components
┃ ┃ ┣ 📂product
┃ ┃ ┃ ┣ 📜ProductBar.tsx
┃ ┃ ┃ ┣ 📜ProductCard.tsx
┃ ┃ ┃ ┣ 📜ProductSection.tsx
┃ ┃ ┃ ┗ 📜ProductSortOptions.tsx
┃ ┃ ┣ 📂ui
┃ ┃ ┃ ┣ 📜Breadcrumbs.tsx
┃ ┃ ┃ ┣ 📜Button.tsx
┃ ┃ ┃ ┣ 📜CrazyLoading.tsx
┃ ┃ ┃ ┣ 📜ImageUpload.tsx
┃ ┃ ┃ ┣ 📜Input.tsx
┃ ┃ ┃ ┣ 📜LoadingSpinner.tsx
┃ ┃ ┃ ┣ 📜ProfileImage.tsx
┃ ┃ ┃ ┣ 📜SectionTitle.tsx
┃ ┃ ┃ ┣ 📜Select.tsx
┃ ┃ ┃ ┗ 📜Skeleton.tsx
┃ ┃ ┣ 📜Footer.tsx
┃ ┃ ┣ 📜ImageSlider.tsx
┃ ┃ ┣ 📜Layout.tsx
┃ ┃ ┣ 📜Navbar.tsx
┃ ┃ ┣ 📜Search.tsx
┃ ┃ ┣ 📜SingleUser.tsx
┃ ┃ ┗ 📜SubNavbar.tsx
┃ ┣ 📂constants
┃ ┃ ┣ 📜constants.ts
┃ ┃ ┗ 📜library.ts
┃ ┣ 📂routes
┃ ┃ ┣ 📂admin
┃ ┃ ┃ ┣ 📜AddProduct.tsx
┃ ┃ ┃ ┣ 📜Admin.tsx
┃ ┃ ┃ ┣ 📜AdminClients.tsx
┃ ┃ ┃ ┣ 📜AdminProducts.tsx
┃ ┃ ┃ ┣ 📜AllTransactions.tsx
┃ ┃ ┃ ┗ 📜EditProduct.tsx
┃ ┃ ┣ 📂myAccount
┃ ┃ ┃ ┣ 📂bank
┃ ┃ ┃ ┃ ┣ 📜BankAccounts.tsx
┃ ┃ ┃ ┃ ┗ 📜ConnectBankAccount.tsx
┃ ┃ ┃ ┣ 📜ChangeName.tsx
┃ ┃ ┃ ┣ 📜ChangePassword.tsx
┃ ┃ ┃ ┣ 📜Info.tsx
┃ ┃ ┃ ┣ 📜Login.tsx
┃ ┃ ┃ ┣ 📜LogoutNeededRoute.tsx
┃ ┃ ┃ ┣ 📜MyAccount.tsx
┃ ┃ ┃ ┣ 📜OrderDetail.tsx
┃ ┃ ┃ ┣ 📜OrderList.tsx
┃ ┃ ┃ ┗ 📜SignUp.tsx
┃ ┃ ┣ 📜Home.tsx
┃ ┃ ┣ 📜NotFound.tsx
┃ ┃ ┣ 📜ProductDetail.tsx
┃ ┃ ┣ 📜Products.tsx
┃ ┃ ┣ 📜ProtectedRoute.tsx
┃ ┃ ┗ 📜SearchProducts.tsx
┃ ┣ 📜App.tsx
┃ ┣ 📜index.css
┃ ┣ 📜main.tsx
┃ ┣ 📜store.ts
┃ ┗ 📜vite-env.d.ts
┣ 📜.eslintrc.cjs
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜custom.d.ts
┣ 📜index.html
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜postcss.config.js
┣ 📜README.md
┣ 📜tailwind.config.js
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┗ 📜vite.config.ts
```
