'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../prisma';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';

const Manager = z
  .object({
    clco_no: z.string({
      invalid_type_error: '기업을 선택해주세요.',
    }),
    mngr_nm: z.string({
      invalid_type_error: '이름을 입력해주세요.',
    }),
    mngr_id: z.string({
      invalid_type_error: '아이디를 입력해주세요.',
    }),
    mngr_pswd: z.string({
      invalid_type_error: '비밀번호를 입력해주세요.',
    }),
    email: z.string({
      invalid_type_error: '이메일을 입력해주세요.',
    }),
    mbph_no: z.string({
      invalid_type_error: '휴대폰 번호를 입력해주세요.',
    }),
    period_tf: z.enum(['Y', 'N'], {
      invalid_type_error: '사용기간 설정 여부를 선택해주세요.',
    }),
    use_bgng_ymd: z.string().optional(),
    use_end_ymd: z.string().optional(),
    auth_grp_no: z.string({
      invalid_type_error: '권한그룹을 선택해주세요.',
    }),
    mngr_sctn: z.string({
      invalid_type_error: '관리자 구분을 선택해주세요.',
    }),
    use_tf: z.enum(['Y', 'N'], {
      invalid_type_error: '사용 여부를 선택해주세요.',
    }),
  })
  .refine(
    (data) => {
      return (
        data.period_tf === 'Y' 
        && data.use_bgng_ymd !== '' 
        && data.use_end_ymd !== '' 
        && dayjs(data.use_bgng_ymd).isBefore(dayjs(data.use_end_ymd))
      );
    },
    {
      message: '사용 기간을 확인해주세요.',
      path: ['use_bgng_ymd', 'use_end_ymd'],
    },
  );

// const CreateManager = Manager.omit({ date: true });
// const UpdateInvoice = Manager.omit({ id: true, date: true });

export type State = {
  errors?: {
    clco_no?: string[];
    mngr_sctn?: string[];
    auth_grp_no?: string[];
    period_tf?: string[];
    use_tf?: string[];
    use_bgng_ymd?: string[];
    use_end_ymd?: string[];
  };
  message?: string | null;
  mngrNo?: string;
};

export async function createMngr(prevState: State, formData: FormData) {
  console.log(formData, 'formData');
  const validatedFields = Manager.safeParse({
    clco_no: formData.get('clco_no'),
    mngr_nm: formData.get('mngr_nm'),
    mngr_id: formData.get('mngr_id'),
    mngr_pswd: formData.get('mngr_pswd'),
    email: formData.get('email'),
    mbph_no: formData.get('mbph_no'),
    period_tf: formData.get('period_tf'),
    use_bgng_ymd: formData.get('use_bgng_ymd'),
    use_end_ymd: formData.get('use_end_ymd'),
    auth_grp_no: formData.get('auth_grp_no'),
    mngr_sctn: formData.get('mngr_sctn'),
    use_tf: formData.get('use_tf'),
  });

  console.log(validatedFields, 'validatedFields');
  if (!validatedFields.success) {
    console.log(
      validatedFields.error.flatten().fieldErrors,
      'validatedFieldsErr',
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '관리자 계정 저장 실패',
    };
  }

  const {
    clco_no,
    mngr_nm,
    mngr_id,
    mngr_pswd,
    email,
    mbph_no,
    use_bgng_ymd,
    use_end_ymd,
    mngr_sctn,
    use_tf,
  } = Manager.parse({
    clco_no: formData.get('clco_no'),
    mngr_nm: formData.get('mngr_nm'),
    mngr_id: formData.get('mngr_id'),
    mngr_pswd: formData.get('mngr_pswd'),
    email: formData.get('email'),
    mbph_no: formData.get('mbph_no'),
    period_tf: formData.get('period_tf'),
    use_bgng_ymd: formData.get('use_bgng_ymd'),
    use_end_ymd: formData.get('use_end_ymd'),
    auth_grp_no: formData.get('auth_grp_no'),
    mngr_sctn: formData.get('mngr_sctn'),
    use_tf: formData.get('use_tf'),
  });
  const now = dayjs().add(9, 'hours').toISOString();

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mngr_pswd, salt);
    await prisma.sy_mngr.create({
      data: {
        mngr_id: mngr_id,
        clco_no: Number(clco_no),
        mngr_nm: mngr_nm,
        mngr_pswd: hash,
        email: email,
        mbph_no: mbph_no,
        mngr_sctn_cd: mngr_sctn,
        mngr_stts_cd: '10',
        use_bgng_ymd: dayjs(use_bgng_ymd, 'yyyy-MM-dd')
          .add(9, 'hours')
          .toISOString(),
        use_end_ymd: dayjs(use_end_ymd, 'yyyy-MM-dd')
          .add(9, 'hours')
          .toISOString(),
        use_tf: use_tf,
        regr_no: Number(prevState.mngrNo) || 1,
        modr_no: Number(prevState.mngrNo) || 1,
        reg_dt: now,
        mod_dt: now,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: 관리자 생성 실패',
    };
  }

  revalidatePath('/system/mngr/mng');
  redirect('/system/mngr/mng');
}

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   const amountInCents = amount * 100;

//   try {
//     await sql`
//     UPDATE invoices
//     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//     WHERE id = ${id}
//   `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }
