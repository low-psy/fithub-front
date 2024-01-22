import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import useFilter from '../../hooks/filterHook';
import FilterLayout from '../../components/filter/FilterLayout';
import FilterItem from '../../components/filter/FilterItem';

const Profile = () => {
  const location = useLocation();
  let selectedFilterName = null;
  switch (location.pathname) {
    case '/profile/myprofile':
      selectedFilterName = '내 정보';
      break;
    case '/profile/mypost':
      selectedFilterName = '내가 작성한 게시물';
      break;
    case '/profile/book':
      selectedFilterName = '예약 및 종료 내역';
      break;
    case '/profile/cancel':
      selectedFilterName = '취소 및 환불 내역';
      break;
    default:
      selectedFilterName = null;
  }
  const { selectedFilter, handleFilterClick } = useFilter(selectedFilterName);
  return (
    <div className="flex gap-8">
      <FilterLayout>
        <div className="shadow-md">
          {[
            '내 정보',
            '내가 작성한 게시물',
            '예약 및 종료 내역',
            '취소 및 환불 내역',
          ].map((text) => {
            let toUrl;
            switch (text) {
              case '내 정보':
                toUrl = '/profile/myprofile';
                break;
              case '내가 작성한 게시물':
                toUrl = '/profile/mypost';
                break;
              case '예약 및 종료 내역':
                toUrl = '/profile/book';
                break;
              case '취소 및 환불 내역':
                toUrl = '/profile/cancel';
                break;
              default:
                toUrl = '/profile/myprofile';
            }
            return (
              <Link to={toUrl}>
                <FilterItem
                  key={text}
                  text={text}
                  onClick={() => handleFilterClick(text)}
                  className={`p-4 hover:bg-accent_sub ${
                    selectedFilter === text ? 'bg-accent_sub' : 'bg-white'
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </FilterLayout>
      <section className="w-[728px] ">
        <Outlet />
      </section>
    </div>
  );
};

export default Profile;
