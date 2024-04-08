import React, { FC, useEffect, useState } from 'react';
import { LicenceType } from './type';
import ImageUpload from './ImageUpload';
import {
  addTrainerLicense,
  deleteTrainerLicense,
  fetchTrainerInfo,
} from '../../../apis/trainer';
import ConfirmationModal from '../../../components/modal/ConfirmationModal';

interface Prop {
  list: LicenceType[] | undefined;
}

const License: FC<Prop> = ({ list }) => {
  const [imgs, setImgs] = useState<LicenceType[] | undefined>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | undefined>();

  useEffect(() => {
    setImgs(list);
  }, [list]);

  const updateImgList = async () => {
    const updatedInfo = await fetchTrainerInfo();
    setImgs(updatedInfo.data.trainerLicenseList);
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgs && imgs?.length >= 5) {
      alert('이미지는 최대 5개 까지 첨부할 수 있습니다.');
      return;
    }
    if (!e.target.files) {
      return;
    }
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    e.target.value = '';

    setIsAdding(false);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await addTrainerLicense(formData); // 이미지 추가
      await updateImgList(); // 이미지 가져오기
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteImage = async () => {
    if (idToDelete) {
      setIdToDelete(undefined);
      await deleteTrainerLicense(idToDelete);
      await updateImgList();
    }
  };

  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-col">
          <p className="mb-5 font-bold">자격증</p>
          <div className="flex flex-1 flex-col">
            <ImageUpload
              imgs={imgs}
              handleAddImage={handleAddImage}
              isAdding={isAdding}
              setIdToDelete={setIdToDelete}
            />
            <div className="flex justify-start">
              {imgs && imgs?.length < 5 ? (
                <button
                  type="button"
                  className="mt-[1rem] text-gray-400"
                  onClick={() => setIsAdding(true)}
                >
                  추가하기
                </button>
              ) : (
                <span className="mt-[1rem] text-gray-400">
                  최대 5개만 첨부할 수 있습니다
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 mt-4 w-full border shadow-slate-500" />
      </section>
      <ConfirmationModal
        isOpen={idToDelete !== undefined}
        onClose={() => setIdToDelete(undefined)}
        children={<div>자격증을 삭제하시겠습니까?</div>}
        onConfirm={handleDeleteImage}
        confirmText="확인"
      />
    </>
  );
};

export default License;
