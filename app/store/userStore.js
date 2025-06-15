import {create} from 'zustand';
import { persist } from 'zustand/middleware'; // Optional: For persistence

const useUserStore = create(
  persist( // Wrap with persist for AsyncStorage (optional)
    (set) => ({
      // Initial state
      phoneNumber: '',
      userType: '', // 'employee' or 'employer'
      
      // Actions to update state
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setUserType: (userType) => set({ userType }),
      
      // Optional: Reset state
      reset: () => set({ phoneNumber: '', userType: '' }),
    }),
    {
      name: 'user-storage', // Unique name for AsyncStorage key
      getStorage: () => AsyncStorage, // Use AsyncStorage in React Native
    }
  )
);

export default useUserStore;