import React from 'react';
import { TrainerCareerRequestDto } from '../../types/swagger/model/trainerCareerRequestDto';

interface ICareer {
  [key: string]: string | boolean | (() => void);
  company: string;
  work: string;
  startDate: string;
  endDate: string;
  working: 'true' | 'false';
}

interface ICareerTableDataProps {
  career: TrainerCareerRequestDto;
  handleDeleteCareer?: () => void;
}

function CareerTableData({
  career,
  handleDeleteCareer,
}: ICareerTableDataProps) {
  const { company, work, startDate, endDate, working } = career;
  return (
    <tr>
      <td className="break-keep border border-main px-4 py-1">{company}</td>
      <td className="break-keep border border-main px-4 py-1">{work}</td>
      <td className="whitespace-nowrap border border-main px-4 py-1">
        {startDate}
      </td>
      <td className="whitespace-nowrap border border-main px-4 py-1">
        {working ? '근무중' : endDate}
      </td>
      <td
        className="cursor-pointer whitespace-nowrap border border-main font-semibold text-red-400"
        onClick={handleDeleteCareer}
      >
        삭제
      </td>
    </tr>
  );
}

export default CareerTableData;
