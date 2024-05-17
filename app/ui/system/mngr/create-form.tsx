'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import {
  EnvelopeIcon,
  FlagIcon,
  KeyIcon,
  PhoneIcon,
  TagIcon,
  UserGroupIcon,
  UserIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, useState } from 'react';
import { createMngr } from '@/app/lib/server/mngr-hook/actions';
import { useSession } from 'next-auth/react';
import { DatePickerComponent } from '../../atoms/DatePicker';

interface IAuthGrp {
  clcoNo: string;
  authGrpNm: string;
  authGrpNo: string;
}
export default function MngrCreateForm() {
  const { data: session, status } = useSession();
  const initialState = {
    message: null,
    errors: {},
    regrNo: session?.user.mngrNo,
  };
  const [state, dispatch] = useFormState(createMngr, initialState);
  const [filteredAuthGrp, setFilteredAuthGrp] = useState<IAuthGrp[]>([]);
  const clcoList = [
    { clcoNo: '3', clcoNm: '에임메드' },
    { clcoNo: '5', clcoNm: '비아트리스' },
  ];

  const authGrpClcoNo = [
    { clcoType: '10', typeNm: '에임메드' },
    { clcoType: '20', typeNm: '고객사' },
  ];
  const authGrpList = [
    { clcoNo: '3', authGrpNm: '웹시스템마스터', authGrpNo: '40' },
    { clcoNo: '3', authGrpNm: '시스템마스터', authGrpNo: '10' },
    { clcoNo: '3', authGrpNm: '운영마스터', authGrpNo: '20' },
    { clcoNo: '5', authGrpNm: '기업관리자', authGrpNo: '50' },
  ];

  const mngrSctn = [
    { cd: 10, cdNm: '마스터' },
    { cd: 20, cdNm: '매니저' },
    { cd: 30, cdNm: '고객사' },
    { cd: 40, cdNm: '상담원' },
    { cd: 50, cdNm: '스태프' },
  ];

  const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '10') {
      setFilteredAuthGrp(
        authGrpList.filter((authGrp) => authGrp.clcoNo === '3'),
      );
    } else {
      setFilteredAuthGrp(
        authGrpList.filter((authGrp) => authGrp.clcoNo !== '3'),
      );
    }
  };
  return (
    <>
      <form action={dispatch}>
        <div className="mx-20 mb-10 rounded-md bg-gray-50 px-20 py-10">
          {/* 기업 선택 */}
          <div className="mb-4">
            <label
              htmlFor="clco_no"
              className="mb-2 block text-sm font-semibold"
            >
              기업선택
            </label>
            <div className="relative">
              <select
                id="clco_no"
                name="clco_no"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="clco_no-error"
              >
                <option value="" disabled>
                  기업을 선택하세요.
                </option>
                {clcoList.map((clco) => (
                  <option key={clco.clcoNo} value={clco.clcoNo}>
                    {clco.clcoNm}
                  </option>
                ))}
              </select>
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="clco_no-error" aria-live="polite" aria-atomic="true">
              {state.errors?.clco_no &&
                state.errors.clco_no.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* 이름 */}
          <div className="mb-4">
            <label
              htmlFor="mngr_nm"
              className="mb-2 block text-sm font-semibold"
            >
              이름
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mngr_nm"
                  name="mngr_nm"
                  placeholder="이름을 입력하세요."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* 아이디 */}
          <div className="mb-4">
            <label
              htmlFor="mngr_id"
              className="mb-2 block text-sm font-semibold"
            >
              아이디
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mngr_id"
                  name="mngr_id"
                  placeholder="아이디를 입력하세요."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="mb-4">
            <label
              htmlFor="mngr_pswd"
              className="mb-2 block text-sm font-semibold"
            >
              비밀번호
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mngr_pswd"
                  name="mngr_pswd"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">
              이메일
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* 휴대폰번호 */}
          <div className="mb-4">
            <label
              htmlFor="mbph_no"
              className="mb-2 block text-sm font-semibold"
            >
              휴대폰번호
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="mbph_no"
                  name="mbph_no"
                  placeholder="휴대폰번호 입력하세요."
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                />
                <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* 사용기간 설정*/}
          <fieldset className="mb-4">
            <legend className="mb-2 block text-sm font-semibold">
              사용기간 설정
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-1.5">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="period-y"
                    name="period_tf"
                    type="radio"
                    value="Y"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="period-y"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    Y
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="period-n"
                    name="period_tf"
                    type="radio"
                    value="N"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="period-n"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white"
                  >
                    N
                  </label>
                </div>
              </div>
            </div>
            <div id="period_tf-error" aria-live="polite" aria-atomic="true">
              {state.errors?.period_tf &&
                state.errors.period_tf.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>

          {/* 사용기간 */}
          <div className="mb-4">
            <label
              htmlFor="mbph_no"
              className="mb-2 block text-sm font-semibold"
            >
              사용 기간
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <DatePickerComponent
                  startDtId="use_bgng_ymd"
                  startDtName="use_bgng_ymd"
                  endDtId="use_end_ymd"
                  endDtName="use_end_ymd"
                />
              </div>
            </div>
            <div className="flex justify-around">
              <div
                className="w-full"
                id="use_bgng_ymd-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.use_bgng_ymd &&
                  state.errors.use_bgng_ymd.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div
                id="use_end_ymd-error"
                className="w-full pl-2"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.use_end_ymd &&
                  state.errors.use_end_ymd.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* 권한 선택*/}
          <div className="mb-4">
            <label
              htmlFor="auth_grp_no"
              className="mb-2 block text-sm font-semibold"
            >
              권한
            </label>
            <div className="relative">
              <div className="flex items-center">
                <select
                  id="auth_grp_tp"
                  name="auth_grp_tp"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="auth_grp_tp-error"
                  onChange={handleChangeType}
                >
                  <option value="" disabled>
                    권한그룹 구분선택
                  </option>
                  {authGrpClcoNo.map((authGrp) => (
                    <option key={authGrp.clcoType} value={authGrp.clcoType}>
                      {authGrp.typeNm}
                    </option>
                  ))}
                </select>
                <FlagIcon className="pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                <select
                  id="auth_grp_no"
                  name="auth_grp_no"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="auth_grp_no-error"
                >
                  <option value="" disabled>
                    권한그룹 선택
                  </option>
                  {filteredAuthGrp.map((authGrp) => (
                    <option key={authGrp.authGrpNo} value={authGrp.authGrpNo}>
                      {authGrp.authGrpNm}
                    </option>
                  ))}
                </select>
              </div>
              <div id="auth_grp_no-error" aria-live="polite" aria-atomic="true">
                {state.errors?.auth_grp_no &&
                  state.errors.auth_grp_no.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* 관리자 구분 */}
          <div className="mb-4">
            <label
              htmlFor="clco_no"
              className="mb-2 block text-sm font-semibold"
            >
              관리자 구분
            </label>
            <div className="relative">
              <select
                id="mngr_sctn"
                name="mngr_sctn"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="mngr_sctn-error"
              >
                <option value="" disabled>
                  관리자구분 선택
                </option>
                {mngrSctn.map((sctn) => (
                  <option key={sctn.cd} value={sctn.cd}>
                    {sctn.cdNm}
                  </option>
                ))}
              </select>
              <WalletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="mngr_sctn-error" aria-live="polite" aria-atomic="true">
              {state.errors?.mngr_sctn &&
                state.errors.mngr_sctn.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* 사용여부 */}
          <fieldset className="mb-4">
            <legend className="mb-2 block text-sm font-semibold">
              사용여부
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-1.5">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="use-y"
                    name="use_tf"
                    type="radio"
                    value="Y"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="use-y"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    Y
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="use-n"
                    name="use_tf"
                    type="radio"
                    value="N"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="use-n"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white"
                  >
                    N
                  </label>
                </div>
              </div>
            </div>
            <div id="use_tf-error" aria-live="polite" aria-atomic="true">
              {state.errors?.use_tf &&
                state.errors.use_tf.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/system/mngr/mng"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              취소
            </Link>
            <Button type="submit">저장</Button>
          </div>
        </div>
      </form>
    </>
  );
}
