export default function Footer() {
  return (
    <footer className="container mx-auto px-20">
      <div className="divider my-0" />
      <div className="flex items-center gap-20 px-10 py-2">
        <img src="/mainlogo.png" alt="mainLogo" className="h-16" />
        <p className="text-xs ">
          미친11 주식회사 | 대표자 이패캠 | [교환/반품] 부산광역시 수영구 수영로
          수영장 수영복 | 사업자등록번호 123-45-6789 | <br />
          대표전화 1234-1234 통신판매업 신고번호 제1111-부산수영-1111 |
          개인정보관리 책임자 김패캠 | Copyright 2021 미친11 All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
