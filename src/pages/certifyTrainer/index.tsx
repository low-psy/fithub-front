import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import Header from './Header';
import LicenseImageInput from './LicenseImageInput';
import LicenseNameInput from './LicenseNameInput';
import CareerInput from './CareerInput';
import CareerListTable from './CareerListTable';
import Layout from '../post/Layout';
import certifyTrainer from '../../apis/trainer';
import { SET_TRAINER } from '../../redux/slices/userSlice';
import withAuth from '../../hocs/withAuth';
import { ErrorResponseDto } from '../../types/swagger/model/errorResponseDto';
import { TrainerCareerRequestDto } from '../../types/swagger/model/trainerCareerRequestDto';

interface ICareer {
  [key: string]: string | boolean | (() => void);
  company: string;
  work: string;
  startDate: string;
  endDate: string;
  working: 'true' | 'false';
}

const handleDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month <= 9 ? 0 : ''}${month}-${day <= 9 ? 0 : ''}${day}`;
};

function CertifyTrainer() {
  const navigate = useNavigate();
  // 자격증 이미지 미리보기용
  const [images, setImages] = useState<string[]>([]);
  // form data용
  const [files, setFiles] = useState<File[]>([]);
  // 자격증 이름
  const [licenseNames, setLicenseNames] = useState<string[]>([]);
  // 경력 리스트
  const [careerList, setCareerList] = useState<TrainerCareerRequestDto[]>([]);
  // 경력 하나 입력용
  const [career, setCareer] = useState<TrainerCareerRequestDto>({
    company: '',
    work: '',
    startDate: handleDateToString(new Date()),
    endDate: handleDateToString(new Date()),
    working: false,
    address: '',
    latitude: 0,
    longitude: 0,
  });

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

    if (career.address.replace(/ /g, '').length === 0) {
      alert('트레이닝을 진행할 위치를 입력해주세요');
      return;
    }
    const c = career;
    setCareerList([...careerList, c]);
    setCareer({
      company: '',
      work: '',
      startDate: '',
      endDate: '',
      working: false,
      address: '',
      latitude: 0,
      longitude: 0,
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

  const dispsatch = useDispatch();

  const handleCertifyTrainer = async () => {
    // 자격증 사진 첨부 여부
    if (images.length === 0) {
      // eslint-disable-next-line no-alert
      alert('자격증 사진을 하나 이상 첨부해주세요.');
      return;
    }
    // 자격증 사진들의 이름 작성 여부
    if (images.length !== licenseNames.length) {
      // eslint-disable-next-line no-alert
      alert('자격증 이름을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();

    // 자격증 이미지 첨부
    files.forEach((license) => formData.append('licenseFileList', license));

    // 자격증 이름 첨부
    const licenseNamesStr = licenseNames.join(',');
    formData.append('licenseNames', licenseNamesStr);

    // 경력 첨부
    careerList.forEach((career: TrainerCareerRequestDto, index) => {
      const {
        company,
        work,
        startDate,
        endDate,
        working,
        address,
        latitude,
        longitude,
      } = career;

      formData.append(`careerList[${index}].company`, company);
      formData.append(`careerList[${index}].work`, work);
      formData.append(`careerList[${index}].startDate`, startDate);
      formData.append(`careerList[${index}].endDate`, endDate || '');
      formData.append(`careerList[${index}].working`, String(working));
      formData.append(`careerList[${index}].address`, address);
      formData.append(`careerList[${index}].latitude`, String(latitude));
      formData.append(`careerList[${index}].longitude`, String(longitude));
    });

    try {
      const response = await certifyTrainer(formData);
      if (response.status === 200) {
        alert(
          '트레이너 인증 요청이 완료되었습니다.\n인증 완료까지 몇일이 소요될 수 있습니다.',
        );
        dispsatch(SET_TRAINER());
        navigate('/trainer/new');
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponseDto>;
      if (err.response?.data.code === 'DUPLICATE') {
        dispsatch(SET_TRAINER());
        navigate('/trainer/home');
      }
    }
  };

  const handleCareerWorking = () => {
    const prevWorking = career.working;
    const nextWorking = prevWorking !== true;
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
      working: false,
      address: '',
      latitude: 0,
      longitude: 0,
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

  const handleCareerAddress = (
    address: string,
    latitude: number,
    longitude: number,
  ) => {
    setCareer({ ...career, address, latitude, longitude });
  };

  return (
    <Layout>
      <div className="flex w-full max-w-lg flex-col">
        <Header />
        {/* 자격증 사진 업로드 */}
        <div className="max-w-[300px] sm:max-w-lg">
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
          <p className="text-sm font-semibold text-main md:text-lg">
            2. 자격증 이름을 입력해 주세요.
          </p>
          <p className="mb-2 text-xs text-gray-500 md:text-sm ">
            트레이너 자격증 첨부 시 자동으로 입력란이 생성됩니다.
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
            handleCareerAddress={handleCareerAddress}
          />
          {careerList.length > 0 && (
            <CareerListTable
              careerList={careerList}
              handleDeleteCareer={handleDeleteCareer}
            />
          )}
          {/* 하단 인증하기 버튼 */}
          <button
            type="button"
            className="tex-sm hover:bg-hoverColor mt-8 h-10 w-full rounded bg-main font-semibold text-white md:text-lg"
            onClick={handleCertifyTrainer}
          >
            트레이너 인증하기
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(CertifyTrainer, 'user');
