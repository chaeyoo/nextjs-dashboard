'use client';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Image from 'next/image';
import styles from './Login.module.css';
export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <>
      <div
        className={`flex h-full w-full items-center justify-center px-16 py-12 text-zinc-800`}
      >
        <div
          className={`flex w-[400px] max-w-full flex-col items-center ${styles.overlay}`}
        >
          <h1 className="whitespace-nowrap text-4xl font-bold">admin</h1>
          <p className="mt-3.5 whitespace-nowrap text-lg text-gray-400">
            BackOffice
          </p>
          <form
            className="mt-5 flex w-full flex-col self-stretch rounded-2xl bg-white px-16 py-12 text-base shadow-xl"
            action={dispatch}
          >
            <h2 className="mt-2.5 self-center text-2xl font-medium">로그인</h2>
            {/* <div className="mt-10 flex justify-between gap-5 rounded-3xl bg-slate-100 px-5 py-2.5">
              <label htmlFor="companySelect">기업 선택</label>
            </div> */}
            <div className="mt-4 items-start justify-center whitespace-nowrap rounded-3xl bg-slate-100 px-3 py-2.5 pl-3 text-sm text-gray-400">
              <div className="relative">
                <input
                  id="mngrId"
                  name="mngrId"
                  required
                  placeholder="아이디"
                  className="w-full border-none bg-transparent text-gray-400 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 items-start justify-center whitespace-nowrap rounded-3xl bg-slate-100 px-3 py-2.5 pl-3 text-sm text-gray-400">
              <div className="flex items-center justify-between"></div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  required
                  className="w-full border-none bg-transparent text-gray-400 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
            <LoginButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
            <div className="mb-1 mt-5 flex gap-1.5 self-center text-sm text-gray-500">
              <a href="#" className="grow">
                아이디 찾기
              </a>
              <span className="h-4 w-px bg-gray-500" />
              <a href="#" className="grow">
                비밀번호 찾기
              </a>
            </div>
            <div className="mb-1 mt-2 flex gap-1.5 self-center text-sm text-gray-500">
              <a href="/signup" className="grow">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>

      
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="mt-3 items-center justify-center whitespace-nowrap rounded-3xl bg-sky-600 px-16 py-2.5 font-medium text-white"
    >
      로그인
    </button>
  );
}
