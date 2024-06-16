import { create } from 'zustand'
const useChatStore = create(set => ({
    chatData: null,
    setChatData: (data: any) => set((state: any) => ({ chatData: data })),
}));

export { useChatStore }