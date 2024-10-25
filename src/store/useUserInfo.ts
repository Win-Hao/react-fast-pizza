import { create } from 'zustand';
import { getAddress } from '../services/apiGeocoding';
import { immer } from 'zustand/middleware/immer';

type State = {
  username: string;
  address: string;
  position: Record<string, number>;
  error: string;
};

type Action = {
  updateName: (username: State['username']) => void;
  setAddress: (address: State['address']) => void;
  setPosition: (latitude: number, longitude: number) => void;
  setError: (error: string) => void;
};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<State & Action>()(
  immer((set) => ({
    username: '',
    address: '',
    position: {
      latitude: 0,
      longitude: 0,
    },
    error: '',
    updateName: (username) => set(() => ({ username: username })),
    setAddress: (address) => set(() => ({ address: address })),
    setPosition: (latitude, longitude) =>
      set((state) => {
        state.position['latitude'] = latitude;
        state.position['longitude'] = longitude;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);

const useUsername = () => useUserStore((state) => state.username);
const useAddressError = () => useUserStore((state) => state.error);
const useAddress = () => useUserStore((state) => state.address);
const usePosition = () => useUserStore((state) => state.position);
const useUpdateName = () => useUserStore((state) => state.updateName);
const useSetAddress = () => useUserStore((state) => state.setAddress);
const useSetPosition = () => useUserStore((state) => state.setPosition);
const useSetError = () => useUserStore((state) => state.setError);
export {
  useUsername,
  useUpdateName,
  useSetAddress,
  useSetPosition,
  useSetError,
  useAddressError,
  useAddress,
  usePosition,
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj: any = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}
