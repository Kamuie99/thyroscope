import React, { useState } from 'react';
import styled from 'styled-components';
import useUserStore from '../store/userstore';
import UserListItem from './UserListItem';

// 검색 입력 필드 스타일 정의
const SearchInput = styled.input`
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
`;

// 사용자 수 표시 스타일 정의
const UserCount = styled.p`
  margin-bottom: 10px;
`;

// 테이블 스타일 정의
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

// 공통 테이블 헤더 스타일 정의
const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f0f0f0;
  cursor: pointer;
  width: ${(props) => props.width || 'auto'}; /* 동적으로 너비 설정 */

  &:hover {
    background-color: #d0d0d0;
  }
`;

// 페이지네이션 버튼 컨테이너 스타일 정의
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

// 페이지네이션 버튼 스타일 정의
const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: ${(props) => (props.disabled ? '#ddd' : '#4682B5')}; /* 비활성화 여부에 따라 배경색 변경 */
  color: ${(props) => (props.disabled ? '#999' : '#fff')}; /* 비활성화 여부에 따라 글자색 변경 */
  cursor: ${(props) => (props.disabled ? '' : 'pointer')}; /* 비활성화 여부에 따라 커서 모양 변경 */
  
  &:hover {
    background-color: ${(props) => (props.disabled ? '#ddd' : '#5a9bd4')}; /* 비활성화되지 않은 버튼에 대해 호버 색상 변경 */
  }
`;


// UserList 컴포넌트: 사용자 목록을 관리하고 표시합니다.
const UserList = () => {
  const { users, searchQuery, setSearchQuery, filteredUsers, sortUsers, sortOrder, resetUsers } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // 검색 처리 함수
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // 검색 시 페이지를 1로 리셋
  };

  // 페이지 변경 처리 함수
  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil((searchQuery ? filteredUsers.length : users.length) / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 정렬 변경 처리 함수
  const handleSort = (key) => {
    let order = '';
    if (sortOrder.key === key) {
      if (sortOrder.order === '') {
        order = 'asc';
      } else if (sortOrder.order === 'asc') {
        order = 'desc';
      } else {
        order = ''; // 다시 기본 상태로 되돌림
        resetUsers(); // 사용자 목록을 초기 상태로 복원
        return;
      }
    } else {
      order = 'asc';
    }
    sortUsers(key, order);
  };

  // 현재 페이지에 표시할 사용자 목록 계산
  const displayedUsers = searchQuery ? filteredUsers : users;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = displayedUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div>
      <UserCount>{displayedUsers.length} users</UserCount>
      <SearchInput
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Table>
        <thead>
          <tr>
            <TableHeader width="20px"></TableHeader>
            <TableHeader width="100px" onClick={() => handleSort('username')}>
              username {sortOrder.key === 'username' ? (sortOrder.order === 'asc' ? '↑' : sortOrder.order === 'desc' ? '↓' : '') : ''}
            </TableHeader>
            <TableHeader width="200px" onClick={() => handleSort('email')}>
              email {sortOrder.key === 'email' ? (sortOrder.order === 'asc' ? '↑' : sortOrder.order === 'desc' ? '↓' : '') : ''}
            </TableHeader>
            <TableHeader width="100px" onClick={() => handleSort('nickname')}>
              nickname {sortOrder.key === 'nickname' ? (sortOrder.order === 'asc' ? '↑' : sortOrder.order === 'desc' ? '↓' : '') : ''}
            </TableHeader>
            <TableHeader width="100px" onClick={() => handleSort('gender')}>
              gender {sortOrder.key === 'gender' ? (sortOrder.order === 'asc' ? '↑' : sortOrder.order === 'desc' ? '↓' : '') : ''}
            </TableHeader>
            <TableHeader width="100px"></TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserListItem key={user.email} user={user} />
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <PaginationButton onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>{'<'}</PaginationButton>
        <span>{currentPage}</span>
        <PaginationButton onClick={() => handlePageChange('next')} disabled={currentPage >= Math.ceil(displayedUsers.length / usersPerPage)}>{'>'}</PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default UserList;
