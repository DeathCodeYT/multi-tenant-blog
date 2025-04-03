import { create } from "zustand";
const userState = (set) => ({
  // States
  verifyEmail: "",
  user: {
    isLoggined: false,
    accessToken: null,
    refreshToken: null,
    email: "",
    username: "",
    photo: "",
    name: "",
    roleName: "",
  },

  // Function to change State
  setVerifyEmail: (email) =>
    set((state) => ({
      verifyEmail: email,
    })),
  setUser: (user) =>
    set((state) => ({
      user: { ...state.user, ...user },
    })),
  logoutUser: () =>
    set((state) => ({
      user: {
        isLoggined: false,
        accessToken: null,
        refreshToken: null,
        email: "",
        username: "",
        photo: "",
        name: "",
        roleName: "",
      },
    })),
});
export const useUserStore = create(userState);
