import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useUserStore from '../store/userstore';

// 테이블 셀 스타일링
const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

// 입력 필드 스타일링
const Input = styled.input`
  width: 90%;
  padding: 5px;
`;

// 선택 필드 스타일링
const Select = styled.select`
  width: 90%;
  padding: 5px;
`;

// 저장 버튼 스타일링
const SaveButton = styled.button`
  padding: 5px 10px;
  margin: 0 2px;
  background-color: #4682B5;
  color: white;
  border: none;
  cursor: pointer;
`;

// 삭제 버튼 스타일링
const DeleteButton = styled.button`
  padding: 5px 10px;
  margin: 0 2px;
  background-color: #962727;
  color: white;
  border: none;
  cursor: pointer;
`;

// UserListItem 컴포넌트: 개별 사용자 정보를 표시하고 관리합니다.
const UserListItem = ({ user }) => {
  const { users, deleteUser, updateUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isSelected, setIsSelected] = useState(false);

  // 사용자 선택 상태가 변경될 때마다 편집 모드를 업데이트합니다.
  useEffect(() => {
    setIsEditing(isSelected);
  }, [isSelected]);

  // 입력 필드 값이 변경될 때 호출되는 함수
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  // 변경사항을 저장하는 함수
  const handleSave = () => {
    // 이메일 중복 검사
    if (users.some(existingUser => existingUser.email === editedUser.email && existingUser.email !== user.email)) {
      alert("이미 등록된 이메일이 존재합니다.");
      return; // 중복이 있으면 저장하지 않음
    }

    updateUser(editedUser);
    setIsSelected(false); // 편집 모드 종료
  };

  // 사용자를 삭제하는 함수
  const handleDelete = () => {
    deleteUser(user.email);
    setIsSelected(false); // 편집 모드 종료
  };

  // 사용자 정보를 표시하거나 편집하는 셀을 생성하는 함수
  const renderCell = (field) => (
    <TableCell key={field}>
      {isEditing ? (
        field === 'gender' ? (
          <Select name={field} value={editedUser[field]} onChange={handleEditChange}>
            <option value="male">male</option>
            <option value="female">female</option>
          </Select>
        ) : (
          <Input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={editedUser[field]}
            onChange={handleEditChange}
          />
        )
      ) : (
        user[field]
      )}
    </TableCell>
  );

  return (
    <tr>
      {/* 사용자 선택 체크박스 */}
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => setIsSelected(!isSelected)}
        />
      </TableCell>

      {/* 사용자 정보 셀 */}
      {['username', 'email', 'nickname', 'gender'].map(field => renderCell(field))}

      {/* 편집 모드일 때 표시되는 저장 및 삭제 버튼 */}
      <TableCell>
        {isEditing && (
          <>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </>
        )}
      </TableCell>
    </tr>
  );
};

export default UserListItem;
