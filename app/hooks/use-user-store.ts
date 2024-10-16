import { create } from "zustand";
import { User } from "~/type/types";

interface UserState {
    userInfo: User | null;
    setUserInfo: (info: User) => void;
    clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    userInfo: null,
    setUserInfo: (info: User) => set({userInfo: info}),
    clearUserInfo: () => set({userInfo: null})
}))