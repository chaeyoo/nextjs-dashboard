import { auth } from '@/auth';

export default async function SamplePage() {
  const session = await auth();
  console.log(session, '어드민 샘플');

  return <>연습장</>;
}
