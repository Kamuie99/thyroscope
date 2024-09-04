import React from 'react';
import styled from 'styled-components';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

// 앱의 전체 컨테이너 스타일 정의
const AppContainer = styled.div`
  padding: 16px;
  width: 1000px;
  border: 2.5px solid #2b74f2;
  border-radius: 8px;
  margin-bottom: 32px;
`;

// 섹션 제목 스타일 정의
const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

// App 컴포넌트: 애플리케이션의 메인 구조를 정의합니다.
function App() {
  return (
    <AppContainer>
      {/* 사용자 추가 폼 섹션 */}
      <SectionTitle>Add User</SectionTitle>
      <UserForm />
      
      {/* 사용자 목록 섹션 */}
      <SectionTitle>Users</SectionTitle>
      <UserList />
    </AppContainer>
  );
}

export default App;