import React from 'react';

interface ICareer {
  [key: string]: string | boolean | (() => void);
  company: string;
  work: string;
  startDate: string;
  endDate: string;
  working: 'true' | 'false';
}

interface ICareerTableDataProps {
  career: ICareer;
  handleDeleteCareer?: () => void;
}

function CareerTableData({
  career,
  handleDeleteCareer,
}: ICareerTableDataProps) {
  const { company, work, startDate, endDate, working } = career;
  return (
    <tr>
      <td className="border border-main px-4 py-1 break-keep">{company}</td>
      <td className="border border-main px-4 py-1 break-keep">{work}</td>
      <td className="border border-main px-4 py-1 whitespace-nowrap">
        {startDate}
      </td>
      <td className="border border-main px-4 py-1 whitespace-nowrap">
        {working === 'true' ? '근무중' : endDate}
      </td>
      <td
        className="border border-main cursor-pointer text-red-400 whitespace-nowrap font-semibold"
        onClick={handleDeleteCareer}
      >
        삭제
      </td>
    </tr>
  );
}

export default CareerTableData;
