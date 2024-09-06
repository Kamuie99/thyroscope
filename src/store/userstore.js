import create from 'zustand';

const useUserStore = create((set) => ({
  users: [
    { id: 0, username: 'Frank', email: 'frank@thyroscope.com', nickname: 'mafia1', gender: 'female' },
    { id: 1, username: 'John', email: 'john@thyroscope.com', nickname: 'moderator', gender: 'male' },
    { id: 2, username: 'Julie', email: 'julie@thyroscope.com', nickname: 'civilian2', gender: 'female' },
    { id: 3, username: 'Steve', email: 'steve@thyroscope.com', nickname: 'civilian1', gender: 'male' },
  ],
  // originalUsers 추가
  originalUsers: [
    { id: 0, username: 'Frank', email: 'frank@thyroscope.com', nickname: 'mafia1', gender: 'female' },
    { id: 1, username: 'John', email: 'john@thyroscope.com', nickname: 'moderator', gender: 'male' },
    { id: 2, username: 'Julie', email: 'julie@thyroscope.com', nickname: 'civilian2', gender: 'female' },
    { id: 3, username: 'Steve', email: 'steve@thyroscope.com', nickname: 'civilian1', gender: 'male' },
  ],
  filteredUsers: [],
  searchQuery: '',
  sortOrder: { key: '', order: '' },

  setSearchQuery: (query) => set((state) => {
    const filtered = state.users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
    return { searchQuery: query, filteredUsers: query ? filtered : [] };
  }),

  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: state.users.length }], // 새로운 유저에게 고유 id 부여
    originalUsers: [...state.originalUsers, { ...user, id: state.users.length }] // originalUsers에도 추가
  })),
  updateUser: (updatedUser) => set((state) => ({
    users: state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ),
    originalUsers: state.originalUsers.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ) // originalUsers에서도 업데이트
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id),
    originalUsers: state.originalUsers.filter((user) => user.id !== id) // originalUsers에서도 삭제
  })),

  sortUsers: (key, order) => set((state) => {
    const sortedUsers = [...state.users].sort((a, b) => {
      if (order === 'asc') return a[key].localeCompare(b[key]);
      if (order === 'desc') return b[key].localeCompare(a[key]);
      return 0;
    });
    return { users: sortedUsers, sortOrder: { key, order } };
  }),

  resetUsers: () => set((state) => ({
    users: [...state.originalUsers],  // originalUsers로 초기화
    sortOrder: { key: '', order: '' }, // 초기 상태로 정렬 상태도 리셋
  })),
}));

export default useUserStore;
