import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import styled from 'styled-components';
import reportWebVitals from './reportWebVitals';

// 스타일 컴포넌트를 사용하여 화면 중앙에 고정할 컨테이너 정의
const RootContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 전체 화면 높이 사용 */
  box-sizing: border-box; /* 테두리를 포함한 크기 계산 */
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* RootContainer로 App 컴포넌트를 감싸서 화면 중앙에 고정 */}
    <RootContainer>
      <App />
    </RootContainer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
