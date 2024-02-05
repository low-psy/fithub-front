import React, { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';
import { Iamport } from '../../types/PortOne';

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = nanoid();

export default function CheckoutPage() {
  const location = useLocation();
  const price = location.state?.price;
  const pathname = location.pathname.replace('/checkout', '');

  async function requestPay() {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp25272810');

    IMP.request_pay(
      {
        pg: 'tosspayments', // 반드시 "tosspayments"임을 명시해주세요.
        merchant_uid: generateRandomString(),
        name: '나이키 와플 트레이너 2 SD',
        pay_method: 'kakaopay',
        escrow: false,
        amount: 109000,
        tax_free: 3000,
        buyer_name: '홍길동',
        buyer_email: 'buyer@example.com',
        buyer_tel: '02-1670-5176',
        buyer_addr: '성수이로 20길 16',
        buyer_postcode: '04783',
        m_redirect_url: 'https://helloworld.com/payments/result', // 모바일 환경에서 필수 입력
        notice_url: 'https://helloworld.com/api/v1/payments/notice',
        confirm_url: 'https://helloworld.com/api/v1/payments/confirm',
        currency: 'KRW',
        custom_data: { userId: 30930 },
        display: { card_quota: [0, 6] },
      },
      function (rsp: any) {
        // callback 로직
        //* ...중략... *//
        console.log(rsp);
      },
    );
  }

  return (
    <div className="flex w-full flex-col items-center overflow-auto p-6">
      <div className="w-full max-w-[540px]">
        <div id="payment-method" className="w-full" />
        <div id="agreement" className="w-full" />
        <div className="w-full py-6">
          <button
            type="button"
            className="w-full rounded-xl bg-main px-[11px] py-[22px] text-2xl font-extrabold text-white"
            onClick={requestPay}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
