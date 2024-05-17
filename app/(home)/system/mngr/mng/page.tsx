import Link from 'next/link';

export default function MngrMngPage() {
  return (
    <>
      관리자 관리 페이지
      <Link href="/system/mngr/mng/create">생성</Link>
    </>
  );
}
