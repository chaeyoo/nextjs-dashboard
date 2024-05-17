import prisma from '../../../lib/server/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { id, pwd } = await request.json();

  const existMngr = await prisma.sy_mngr.findFirst({
    where: {
      mngr_id: id,
    },
  });
  if (existMngr) {
    const isPwdCorrect = await bcrypt.compare(pwd, existMngr.mngr_pswd);
    if (isPwdCorrect) {
      return Response.json({ res: existMngr.email });
    } else {
      return Response.json({ res: '비밀번호가 일치하지 않습니다.' });
    }
  } else {
    return Response.json({ res: '존재하지 않는 아이디입니다.' });
  }
}
