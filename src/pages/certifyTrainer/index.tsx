import React, { useState } from 'react';
import { defaultAxios } from '../../apis/axios';
import Header from './Header';
import LicenseImageInput from './LicenseImageInput';
import LicenseNameInput from './LicenseNameInput';
import CareerInput from './CareerInput';
import CareerListTable from './CareerListTable';

interface ICareer {
  [key: string]: string | boolean | (() => void);
  company: string;
  work: string;
  startDate: string;
  endDate: string;
  working: 'true' | 'false';
}

function CertifyTrainer() {
  // 자격증 이미지 미리보기용
  const [images, setImages] = useState<string[]>([]);
  // form data용
  const [files, setFiles] = useState<File[]>([]);
  // 자격증 이름
  const [licenseNames, setLicenseNames] = useState<string[]>([]);

  const handleDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };
  // 경력 하나 입력용
  const [career, setCareer] = useState<ICareer>({
    company: '',
    work: '',
    startDate: handleDateToString(new Date()),
    endDate: handleDateToString(new Date()),
    working: 'false',
  });
  // 경력 리스트
  const [careerList, setCareerList] = useState<ICareer[]>([]);
  const handleAddCareerList = () => {
    if (career.company.replace(/ /g, '').length === 0) {
      // eslint-disable-next-line no-alert
      alert('회사명을 입력해주세요');
      return;
    }
    if (career.work.replace(/ /g, '').length === 0) {
      // eslint-disable-next-line no-alert
      alert('담당 업무를 입력해주세요');
      return;
    }
    const c = career;
    setCareerList([...careerList, c]);
    setCareer({
      company: '',
      work: '',
      startDate: '',
      endDate: '',
      working: 'false',
    });
  };

  const handleCareerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    const { value } = e.target;
    setCareer({ ...career, [id]: value });
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 5) {
      // eslint-disable-next-line no-alert
      alert('이미지는 최대 5개 까지 첨부할 수 있습니다.');
      return;
    }
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length === 0) {
      return;
    }

    const image = e.target.files[0];
    const imageURL = URL.createObjectURL(image);
    setImages([...images, imageURL]);
    setFiles([...files, image]);

    // eslint-disable-next-line no-param-reassign
    e.target.value = '';
  };

  const handleLicenseName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevLicenseNamse = [...licenseNames];
    const targetId = e.target.id;
    const { value } = e.target;
    prevLicenseNamse.splice(parseInt(targetId, 10), 1, value);
    setLicenseNames([...prevLicenseNamse]);
  };

  const certifyTrainer = async () => {
    // 자격증 사진 첨부 여부
    if (images.length === 0) {
      // eslint-disable-next-line no-alert
      alert('자격증 사진을 하나 이상 첨부해주세요.');
      return;
    }
    // 자격증 사진들의 이름 작성 여부
    if (images.length !== licenseNames.length) {
      // eslint-disable-next-line no-alert
      alert('자격증 이름을 입력해주세요.');
      return;
    }

    const url = process.env.REACT_APP_BASE_SERVER_URL as string;
    const formData = new FormData();

    // 자격증 이미지 첨부
    files.forEach((license) => formData.append('licenseFileList', license));

    // 자격증 이름 첨부
    const licenseNamesStr = licenseNames.join(',');
    formData.append('licenseNames', licenseNamesStr);

    // 경력 첨부
    careerList.forEach((c) => {
      const blob = new Blob([JSON.stringify(c)], {
        type: 'application/json',
      });
      formData.append('careerList', blob);
    });

    try {
      const response = defaultAxios.post(
        `${url}/auth/trainer/certificate`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCareerWorking = () => {
    const prevWorking = career.working;
    const nextWorking = prevWorking === 'true' ? 'false' : 'true';
    setCareer({
      ...career,
      working: nextWorking,
    });
  };

  const handleCareerReset = () => {
    setCareer({
      company: '',
      work: '',
      startDate: '',
      endDate: '',
      working: 'false',
    });
  };

  const handleCareerDate = (date: Date, id: string) => {
    const dateStr = handleDateToString(date);

    setCareer({ ...career, [id]: dateStr });
  };

  const handleDeleteImage = (idx: number) => {
    setImages(images.filter((_, index) => index !== idx));
    setFiles(files.filter((_, index) => index !== idx));
    setLicenseNames(licenseNames.filter((_, index) => index !== idx));
  };

  const handleDeleteCareer = (idx: number) => {
    setCareerList(careerList.filter((_, index) => index !== idx));
  };

  return (
    <div className="mb-8 flex flex-col">
      <Header />
      {/* 자격증 사진 업로드 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-main md:text-lg">
          1. 트레이너 자격증을 첨부해 주세요. (최대 5개)
        </p>
        <LicenseImageInput
          images={images}
          handleAddImage={handleAddImage}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
      <div className="my-4 w-full border-[0.5px] border-gray-300" />
      {/* 자격증 이름 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-main md:text-lg">
          2. 자격증 이름을 입력해 주세요.
        </p>
        <LicenseNameInput
          images={images}
          licenseNames={licenseNames}
          handleLicenseName={handleLicenseName}
        />
      </div>
      <div className="my-4 w-full border-[0.5px] border-gray-300" />
      {/* 트레이닝 경력 */}
      <div>
        <p className="mb-2 text-sm font-semibold text-main md:text-lg">
          3. 트레이닝 경력을 입력하여 주세요. (최대 10개)
        </p>
        <CareerInput
          career={career}
          handleCareerInput={handleCareerInput}
          handleCareerDate={handleCareerDate}
          handleCareerWorking={handleCareerWorking}
          handleCareerReset={handleCareerReset}
          handleAddCareerList={handleAddCareerList}
        />
        {careerList.length > 0 && (
          <CareerListTable
            careerList={careerList}
            handleDeleteCareer={handleDeleteCareer}
          />
        )}
        {/* 하단 인증하기 버튼 */}
        <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 sm:bottom-8 md:px-2">
          <div className="mx-4">
            <button
              type="button"
              className="tex-sm hover:bg-hoverColor mt-8 h-10 w-full rounded bg-main font-semibold text-white md:text-lg"
              onClick={certifyTrainer}
            >
              트레이너 인증하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertifyTrainer;
