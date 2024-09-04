import create from 'zustand';

const useUserStore = create((set) => ({
  users: [
    { username: 'Frank', email: 'frank@thyroscope.com', nickname: 'mafia1', gender: 'female' },
    { username: 'John', email: 'john@thyroscope.com', nickname: 'moderator', gender: 'male' },
    { username: 'Julie', email: 'julie@thyroscope.com', nickname: 'civilian2', gender: 'female' },
    { username: 'Steve', email: 'steve@thyroscope.com', nickname: 'civilian1', gender: 'male' },
  ],
  originalUsers: [
    { username: 'Frank', email: 'frank@thyroscope.com', nickname: 'mafia1', gender: 'female' },
    { username: 'John', email: 'john@thyroscope.com', nickname: 'moderator', gender: 'male' },
    { username: 'Julie', email: 'julie@thyroscope.com', nickname: 'civilian2', gender: 'female' },
    { username: 'Steve', email: 'steve@thyroscope.com', nickname: 'civilian1', gender: 'male' },
  ],
  filteredUsers: [],
  searchQuery: '',
  sortOrder: { key: '', order: '' },

  setSearchQuery: (query) => set((state) => {
    const filtered = state.users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
    return { searchQuery: query, filteredUsers: query ? filtered : [] };
  }),

  addUser: (user) => set((state) => ({
    users: [...state.users, user],
    originalUsers: [...state.originalUsers, user],  // originalUsers 업데이트
  })),

  updateUser: (updatedUser) => set((state) => ({
    users: state.users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    ),
    originalUsers: state.originalUsers.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    ),  // originalUsers 업데이트
  })),

  deleteUser: (email) => set((state) => ({
    users: state.users.filter((user) => user.email !== email),
    originalUsers: state.originalUsers.filter((user) => user.email !== email),  // originalUsers 업데이트
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
