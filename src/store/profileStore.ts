import {create} from 'zustand'

type ProfileStore={
   profilePicModal:boolean,
   toggleModal:()=>void,
   setModal:(value:boolean)=>void;
}
export const useProfileStore = create<ProfileStore>((set) => ({
  profilePicModal: false,
  toggleModal: () =>
    set((state) => ({ profilePicModal: !state.profilePicModal })),
  setModal: (value) => set({ profilePicModal: value }),
}));