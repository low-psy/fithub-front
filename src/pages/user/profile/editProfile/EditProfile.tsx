/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/reduxHooks';
import { SET_PROFILE_URL } from 'redux/slices/userSlice';
import {
  editInterest,
  updateProfile,
  updateProfileImg,
} from '../../../../apis/user';
import { IProfile } from '../../../../types/profile';
import { Gender } from '../../../../types/user';

const interestArr = ['PILATES', 'HEALTH', 'PT', 'CROSSFIT', 'YOGA'];

const EditProfile = () => {
  const navigate = useNavigate();
  const prevProfile = useLoaderData() as IProfile;
  const [profileImgFile, setProfileImgFile] = useState<File | undefined>();
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);

  // 프로필(nickname, email, phone, gender, bio, profileImg)
  const [profile, setProfile] = useState<IProfile>(prevProfile);
  // 이미지 미리보기
  const [profileImage, setProfileImage] = useState<string>(
    prevProfile.profileImg,
  );
  useEffect(() => {
    setSelectedInterest(profile.interests);
  }, []);

  const dispatch = useAppDispatch();

  // 이미지 업로드를 위한 ref
  const inputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 버튼 클릭
  const onClickImageUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  // 이미지 변경
  const handlePutImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log(e.target.files[0]);

    const imageURL = URL.createObjectURL(e.target.files[0]);
    // setInfo({ ...info, profileImg: imageURL });
    setProfileImage(imageURL);
    setProfileImgFile(e.target.files[0]);
  };

  // 이름, 닉네임, 전화번호, 소개 변경
  const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  // 성별 변경
  const handleChangeGender = (e: React.MouseEvent<HTMLButtonElement>) => {
    const gender = e.currentTarget.id as Gender;
    setProfile({ ...profile, gender });
  };

  // 성별 CSS
  const selectedButtonCSS =
    'py-1 px-4 bg-main text-white font-semibold rounded h-10 w-full sm:w-32';
  const unSelectedButtonCSS =
    'py-1 px-4  border border-main rounded h-10 w-full sm:w-32';

  const handlePutProfile = async () => {
    const { name, nickname, phone, gender, bio } = profile;
    if (profileImgFile) {
      const formData = new FormData();
      formData.append('image', profileImgFile);

      try {
        const response = await updateProfileImg(formData);
        if (response && response.status === 200) {
          dispatch(SET_PROFILE_URL(profileImage));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
        }
      }
    }

    // 관심사 수정
    await editInterest({ interestsUpdated: true, interests: selectedInterest });

    try {
      const response = await updateProfile(name, nickname, phone, gender, bio);
      if (response && response.status === 200) {
        alert('수정 완료');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
    navigate('/user/profile');
  };

  const handleInterestClick = (interest: string) => {
    // 관심사 삭제
    if (selectedInterest.includes(interest)) {
      setSelectedInterest((prev) => prev.filter((e) => e !== interest));
    } else {
      // 관심사 추가
      setSelectedInterest((prev) => [...prev, interest]);
    }
  };
  return (
    <div>
      <p className="mb-4 text-lg font-semibold">프로필 수정</p>
      {/* 프로필 이미지 */}
      <div className="mb-4 flex items-end gap-4">
        <img
          src={profileImage}
          alt="profile_image"
          className="h-28 w-28 rounded-full bg-gray-50 shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePutImage}
          ref={inputRef}
        />
        <button
          type="button"
          onClick={onClickImageUpload}
          className="h-10 rounded bg-main px-4 py-1 font-semibold text-white"
        >
          이미지 변경
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* 이름 */}
        <div>
          <p className="font-semibold">이름</p>
          <input
            id="name"
            className="h-10 w-full rounded border border-gray-300 px-4 py-1 sm:w-9/12"
            value={profile.name}
            onChange={handleInfo}
          />
        </div>
        {/* 닉네임 */}
        <div>
          <p className="font-semibold">닉네임</p>
          <input
            id="nickname"
            className="h-10 w-full rounded border border-gray-300 px-4 py-1 sm:w-9/12"
            value={profile.nickname}
            onChange={handleInfo}
          />
        </div>
        {/* 전화번호 */}
        <div>
          <p className="font-semibold">전화번호</p>
          <input
            id="phone"
            className="h-10 w-full rounded border border-gray-300 px-4 py-1 sm:w-9/12"
            value={profile.phone}
            onChange={handleInfo}
          />
        </div>
        {/* bio */}
        <div>
          <p className="font-semibold">내 소개</p>
          <input
            id="bio"
            className="h-10 w-full rounded border border-gray-300 px-4 py-1 sm:w-9/12"
            value={profile.bio}
            onChange={handleInfo}
          />
        </div>
        {/* 관심사 */}
        <div>
          <p className="mb-1 font-semibold">관심사</p>
          <div className="flex">
            {interestArr.map((interest) => (
              <div
                key={interest}
                className="mr-5 flex h-10 w-[100px] cursor-pointer items-center justify-center rounded-full  pl-5 pr-5"
                style={{
                  background: `${selectedInterest.includes(interest) ? '#E0D1FF' : '#ECEEEF'}`,
                }}
                onClick={() => handleInterestClick(interest)}
              >
                <p className="font-semibold">{interest}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 성별 */}
        <div className="mb-4">
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
        <div className="flex flex-row gap-4">
          <button
            type="button"
            onClick={handlePutProfile}
            className="h-10 w-52 rounded bg-main px-2 py-1 font-semibold text-white"
          >
            저장하기
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-10 w-52 rounded bg-rose-400 px-2 py-1 font-semibold text-white"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
