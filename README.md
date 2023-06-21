# 🤝 패스트캠퍼스 FE5 쇼핑몰 팀프로젝트

<p align="center">
  <img src="https://github.com/howooking/fastcampus-KDT5-M3/assets/87072568/547f1fe5-0b71-4796-abac-6c7e86075dba"><br>
  <a href="https://hits.seeyoufarm.com">
    <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fhowooking%2FKDT5-M5&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false" alt="Hits">
  </a>
</p>
<br>

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

<br><br><br>

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

<img src="https://img.shields.io/badge/NPM-CB3837?style=flat&logo=github&logoColor=white"/><br>
<img src="https://img.shields.io/badge/VITE-646CFF?style=flat&logo=github&logoColor=white"/><br>

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
|                                                                                    카테고리별 상품                                                                                    |                                                                                       상품검색                                                                                        |
| <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/15934011c83bd52b28b65bd16dccca61a2fa7ceb/public/readme/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%EB%B3%84.png" width="400"/> |              <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B2%80%EC%83%89.png" width="400"/>               |
|                                                                                    연관 상품 추천                                                                                     |                                                                                   상품 상세 페이지                                                                                    |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/15934011c83bd52b28b65bd16dccca61a2fa7ceb/public/readme/%EC%97%B0%EA%B4%80%EC%83%81%ED%92%88.png" width="400"/>      | <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png" width="400"/> |
|                                                                                       회원정보                                                                                        |                                                                                       상품관리                                                                                        |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4.png" width="400"/>      |     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%ED%92%88%EA%B4%80%EB%A6%AC.png" width="400"/>      |
|                                                                                       상품추가                                                                                        |                                                                                       상품수정                                                                                        |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EC%83%81%ED%92%88%EC%B6%94%EA%B0%80.png" width="400"/>      |                        <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%EC%83%81%ED%92%88%EC%88%98%EC%A0%95.png?raw=true" width="400"/>                        |
|                                                                                       거래내역                                                                                        |                                                                                        내정보                                                                                         |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B1%B0%EB%9E%98%EB%82%B4%EC%97%AD.png" width="400"/>      |          <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EB%82%B4%EC%A0%95%EB%B3%B4.png" width="400"/>          |
|                                                                                    계좌조회 / 해지                                                                                    |                                                                                       계좌 연결                                                                                       |
|    <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B3%84%EC%A2%8C%20%EC%A1%B0%ED%9A%8C.png" width="400"/>    |     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B3%84%EC%A2%8C%EC%97%B0%EA%B2%B0.png" width="400"/>      |
|                                                                                       구매내역                                                                                        |                                                                                       로딩화면                                                                                        |
|     <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EA%B5%AC%EB%A7%A4%EB%82%B4%EC%97%AD.png" width="400"/>      |              <img src="https://raw.githubusercontent.com/howooking/KDT5-M5/2237dd90bec93fbce697340069ef08e8d893f60c/public/readme/%EB%A1%9C%EB%94%A9.gif" width="400"/>               |
|                                                                                        로그인                                                                                         |                                                                                       회원가입                                                                                        |
|                            <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png?raw=true" width="400"/>                             |                        <img src="https://github.com/howooking/KDT5-M5/blob/main/public/readme/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png?raw=true" width="400"/>                        |
