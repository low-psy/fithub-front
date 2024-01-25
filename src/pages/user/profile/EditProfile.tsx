import React, { useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { authAxios } from '../../../apis/axios';
import { compareCertifyNumber, sendCertifyNumber } from '../../../apis/user';
import { IProfile } from '../../../types/profile';
import { Gender } from '../../../types/user';

export const loader = async () => {
  const response = await authAxios.get('/users/profile');
  return response.data;
};

const EditProfile = () => {
  const prevProfile = useLoaderData() as IProfile;
  const name = '서울로그';

  // 프로필(nickname, email, phone, gender, bio, profileImg)
  const [profile, setProfile] = useState<IProfile>(prevProfile);
  // 이미지 미리보기
  const [profileImage, setProfileImage] = useState<string>(
    prevProfile.profileImg,
  );

  // 이메일 인증 전송 여부
  const [isSent, setIsSent] = useState<boolean>(false);
  // 인증번호
  const [certifyNumber, setCertifyNumber] = useState<string>('');
  // 이메일 인증 됐는지
  const [isCertified, setIsCertified] = useState<boolean>(false);

  // 이미지 업로드를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 버튼 클릭
  const onClickImageUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  // 이미지 변경
  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imageURL = URL.createObjectURL(e.target.files[0]);
    // setInfo({ ...info, profileImg: imageURL });
    setProfileImage(imageURL);
  };

  // 이름(지금은안됨), 닉네임, 전화번호 변경
  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  // 성별 변경
  const handleChangeGender = (e: React.MouseEvent<HTMLButtonElement>) => {
    const gender = e.currentTarget.id as Gender;
    setProfile({ ...profile, gender });
  };

  // 성별 CSS
  const selectedButtonCSS =
    'py-1 px-4 bg-main text-white font-semibold rounded h-10';
  const unSelectedButtonCSS = 'py-1 px-4  border border-main rounded h-10';

  // 이메일 인증 요청
  const onSendCertifyNumber = async () => {
    try {
      const response = await sendCertifyNumber(profile.email);
      if (response && response.status === 200) {
        setIsSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 인증번호 비교
  const onCompareCertifyNumber = async () => {
    try {
      const response = await compareCertifyNumber(certifyNumber, profile.email);
      if (response && response.status === 200) {
        setIsCertified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCertifyNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCertifyNumber(e.target.value);
  };

  const handlePatchInfo = async () => {
    try {
      const response = await authAxios.patch('/users/profile/update', {
        profileDto: {
          nickname: '수정테스트',
        },
      });
      if (response && response.status === 200) {
        // eslint-disable-next-line no-alert
        alert('수정 완료');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">프로필 수정</p>
      {/* 프로필 이미지 */}
      <div className="flex items-end gap-2">
        <img
          src={profileImage}
          alt="profile_image"
          className="h-28 w-28 rounded-full bg-gray-50 shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeProfileImg}
          ref={inputRef}
        />
        <button
          type="button"
          onClick={onClickImageUpload}
          className="h-12 rounded bg-main px-2 py-1 font-semibold text-white"
        >
          이미지 변경
        </button>
      </div>

      <div className="my-6 w-full border shadow-slate-500" />
      <div className="flex flex-col gap-4">
        {/* 이름 */}
        {/* 일단 disabled 처리해놈 */}
        <div>
          <p className="font-semibold">이름</p>
          <input
            id="name"
            className="h-10 rounded border border-gray-300 px-4 py-1"
            value={name}
            disabled
          />
        </div>
        {/* 닉네임 */}
        <div>
          <p className="font-semibold">닉네임</p>
          <input
            id="nickname"
            className="h-10 rounded border border-gray-300 px-4 py-1"
            value={profile.nickname}
            onChange={handleChangeInfo}
          />
        </div>
        {/* 전화번호 */}
        <div>
          <p className="font-semibold">전화번호</p>
          <input
            id="phone"
            className="h-10 rounded border border-gray-300 px-4 py-1"
            value={profile.phone}
            onChange={handleChangeInfo}
          />
        </div>
        {/* 성별 */}
        <div>
          <p className="font-semibold">성별</p>
          <div className="flex gap-4">
            <button
              type="button"
              id="M"
              onClick={handleChangeGender}
              className={
                profile.gender === 'M' ? selectedButtonCSS : unSelectedButtonCSS
              }
            >
              남자
            </button>
            <button
              type="button"
              id="F"
              onClick={handleChangeGender}
              className={
                profile.gender === 'F' ? selectedButtonCSS : unSelectedButtonCSS
              }
            >
              여자
            </button>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handlePatchInfo}
            className="h-10 w-36 rounded bg-main px-2 py-1 text-white"
          >
            저장하기
          </button>
        </div>
        <div className="my-6 w-full border shadow-slate-500" />
        {/* 이메일 */}
        <div>
          <p className="font-semibold">이메일</p>
          <p className="text-sm text-gray-500">
            이메일 변경은 인증이 필요합니다.
          </p>
          <div className="flex gap-4">
            <input
              id="email"
              className="h-10 rounded border border-gray-300 px-4 py-1"
              value={profile.email}
              onChange={handleChangeInfo}
            />
            <button
              type="button"
              className="rounded bg-main px-4 py-1 text-white"
              onClick={onSendCertifyNumber}
            >
              인증번호 전송
            </button>
          </div>
          {isSent && (
            <div className="mt-4">
              <p className="font-semibold">인증번호 입력</p>
              <div className="flex gap-4">
                <input
                  className="h-10 rounded border border-gray-300 px-4 py-1"
                  value={certifyNumber}
                  onChange={handleChangeCertifyNumber}
                />
                <button
                  type="button"
                  onClick={onCompareCertifyNumber}
                  className="h-10 rounded bg-main px-4 py-1 text-white"
                >
                  인증하기
                </button>
              </div>
            </div>
          )}
          {isCertified && (
            <div className="mt-4">
              <p className="text-sm text-rose-500">
                아래 버튼을 눌러야 이메일 변경이 완료됩니다.
              </p>
              <button
                type="button"
                className="h-10 rounded bg-main p-2 text-white"
              >
                이메일 저장하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
