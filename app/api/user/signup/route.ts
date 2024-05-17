import prisma from '../../../lib/server/prisma';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const info = await request.json();
  let pwd = info.mngr_pswd;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pwd, salt);

  const now = dayjs().add(9, 'hours').toISOString();
  const user = await prisma.sy_mngr.create({
    data: { ...info, mngr_pswd: hash, reg_dt: now, mod_dt: now },
  });
  return Response.json({ res: user.email });
}

export async function GET(request: Request, res: Response) {
  return Response.json({ res: 'dik' });
}
