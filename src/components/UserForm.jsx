import React, { useState } from "react";
import styled from 'styled-components';
import useUserStore from "../store/userstore";

// 폼 컨테이너 스타일 정의
const FormContainer = styled.form`
  margin-bottom: 20px;
`;

// 폼 섹션 스타일 정의
const FormSection = styled.section`
  display: flex;
  width: 100%;
`;

// 폼 아이템 스타일 정의
const FormItem = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 20%;
`;

// 라벨 스타일 정의
const Label = styled.label`
  margin-left: 5px;
`;

// 입력 필드 스타일 정의
const Input = styled.input`
  border: 1px solid ${props => props.hasError ? 'red' : 'black'};
  padding: 5px;
  margin: 5px;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// 선택 필드 스타일 정의
const Select = styled.select`
  border: 1px solid black;
  padding: 5px;
  margin: 5px;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

// 제출 버튼 스타일 정의
const SubmitButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
`;

// UserForm 컴포넌트: 사용자 정보를 입력받는 폼을 관리합니다.
const UserForm = () => {
  const { users, addUser } = useUserStore(); // 기존 사용자 목록을 가져옵니다.
  
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    nickname: '',
    gender: 'Select'
  });

  // 각 입력 필드의 오류 상태 관리
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    nickname: false
  });

  // 입력값 유효성 검사 함수
  const validateInput = (name, value) => {
    const patterns = {
      username: /^[가-힣a-zA-Z\s\d]{3,15}$/,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      nickname: /^[가-힣a-zA-Z\s\d]{3,15}$/
    };

    return patterns[name] ? patterns[name].test(value) : true;
  };

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    setErrors({...errors, [name]: !validateInput(name, value)});
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 동일한 이메일이 있는지 검사
    if (users.some(user => user.email === formData.email)) {
      alert("이미 등록된 이메일이 존재합니다.");
      return; // 중복이 있으면 추가하지 않음
    }

    if (!Object.values(errors).some(Boolean) && Object.values(formData).every(Boolean) && formData.gender !== 'Select') {
      addUser(formData);
      setFormData({ username: '', email: '', nickname: '', gender: 'Select' });
      setErrors({ username: false, email: false, nickname: false });
    }
  };

  // 폼 유효성 검사
  const isFormValid = !Object.values(errors).some(Boolean) && Object.values(formData).every(Boolean) && formData.gender !== 'Select';

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection>
        {['username', 'email', 'nickname'].map(field => (
          <FormItem key={field}>
            <Label>{field}</Label>
            <Input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field}
              hasError={errors[field]}
            />
          </FormItem>
        ))}
        <FormItem>
          <Label>gender</Label>  
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Select" disabled>Select</option>
            <option value="female">female</option>
            <option value="male">male</option>
          </Select>
        </FormItem>
      </FormSection>
      <SubmitButton type="submit" disabled={!isFormValid}>Add</SubmitButton>
    </FormContainer>
  );
};

export default UserForm;
