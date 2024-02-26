import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  closeTraining,
  deleteTraining,
  openTraining,
} from '../../apis/trainig';
import { errorFunc, formatDate } from '../../utils/util';
import { TrainersTrainingOutlineDto } from '../../types/swagger/model/trainersTrainingOutlineDto';
import DefaultModal from '../../components/modal/DefaultModal';
import TrainerUpdateForm from './TrainerUpdateForm';
import LinkBtnWithImg from '../../components/btn/LinkBtnWithImg';
import ClickBtn from '../../components/btn/ClickBtn';
import useModal from '../../hooks/useModal';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

export interface TrainingItemProps {
  trainerInfoDto: TrainersTrainingOutlineDto;
  isClosed: boolean;
}

const TrainingItem: React.FunctionComponent<TrainingItemProps> = ({
  trainerInfoDto,
  isClosed,
}) => {
  const navigate = useNavigate();
  const startDate = formatDate(trainerInfoDto.startDate);
  const endDate = formatDate(trainerInfoDto.endDate);

  const deleteModal = useModal();
  const closeModal = useModal();
  const openModal = useModal();
  const editModal = useModal(); // 수정 모달 상태 관리
  const editContentModal = useModal(); // 수정 모달 상태 관리
  const editCalendarModal = useModal(); // 수정 모달 상태 관리

  const handleMenuItemClick = (action: string) => {
    if (action === '수정하기') {
      editModal.toggle();
    } else if (action === '삭제하기') {
      deleteModal.toggle();
    } else if (action === '마감하기') {
      closeModal.toggle();
    } else if (action === '마감해제') {
      openModal.toggle();
    } else if (action === '내용수정') {
      editContentModal.toggle();
    } else if (action === '날짜수정') {
      editCalendarModal.toggle();
    }
  };

  let menuArray;
  if (isClosed) {
    menuArray = ['마감해제', '삭제하기'];
  } else {
    menuArray = ['수정하기', '삭제하기', '마감하기'];
  }

  const trainingId = trainerInfoDto.trainingId as number;

  const handleConfirm = async (
    action: 'delete' | 'close' | 'open' | 'edit',
  ) => {
    try {
      let res;
      if (action === 'delete') {
        res = await deleteTraining(trainerInfoDto.trainingId as number);
        deleteModal.toggle();
      } else if (action === 'close') {
        res = await closeTraining(trainerInfoDto.trainingId as number);
        closeModal.toggle();
      } else if (action === 'open') {
        res = await openTraining(trainerInfoDto.trainingId as number);
        openModal.toggle();
      }

      if (res && res.status === 200) {
        navigate(0); // 페이지 새로고침
      } else {
        throw new Error(`Server error with status: ${res && res.status}`);
      }
    } catch (err) {
      console.error(err);
      errorFunc(err);
      navigate(0); // 실패 시 페이지 새로고침
    }
  };

  return (
    <>
      <LinkBtnWithImg
        {...trainerInfoDto}
        to={`/detail/${trainerInfoDto.trainingId}`}
        startDate={startDate}
        endDate={endDate}
        dropdown
        menuArray={menuArray}
        dropdownHandler={handleMenuItemClick}
      />
      <ConfirmationModal
        isOpen={closeModal.isOpen}
        onClose={closeModal.toggle}
        onConfirm={() => handleConfirm('close')}
        confirmText="마감"
      >
        정말 해당 트레이닝을 마감 하시겠습니까?
      </ConfirmationModal>
      <DefaultModal
        isOpen={editContentModal.isOpen}
        onClose={editContentModal.toggle}
        modalMaxHeight="600px"
        modalWidth="1000px"
      >
        <div className="w-full space-y-6">
          <TrainerUpdateForm trainingId={trainingId} />
        </div>
      </DefaultModal>
      <ConfirmationModal
        isOpen={openModal.isOpen}
        onClose={openModal.toggle}
        onConfirm={() => handleConfirm('open')}
        confirmText="마감해제"
      >
        정말 해당 트레이닝을 마감해제 하시겠습니까?
      </ConfirmationModal>
      <DefaultModal
        isOpen={editModal.isOpen}
        onClose={editModal.toggle}
        modalMaxHeight="400"
      >
        <div className="w-[400px]">
          <div className="  space-y-4">
            <ClickBtn
              onClick={() => {
                editModal.toggle();
                editContentModal.toggle();
              }}
            >
              내용수정
            </ClickBtn>
            <ClickBtn
              onClick={() => {
                editModal.toggle();
                editCalendarModal.toggle();
              }}
            >
              날짜 수정
            </ClickBtn>
          </div>
        </div>
      </DefaultModal>
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.toggle}
        onConfirm={() => handleConfirm('delete')}
        confirmText="삭제"
      >
        정말 해당 트레이닝을 삭제 하시겠습니까?
      </ConfirmationModal>
    </>
  );
};
export default TrainingItem;
