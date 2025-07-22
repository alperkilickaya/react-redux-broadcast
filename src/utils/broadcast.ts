// utils/broadcast.ts
import { store } from "../store/store";
import { setUser, clearUser } from "../store/userSlice";

const channel = new BroadcastChannel("auth-sync");

// broadcast user for other tabs. We will use this to sync user data between tabs
export const broadcastUser = (payload: {
  accessToken: string;
  refreshToken: string;
  name: string;
}) => {
  channel.postMessage({ type: "SET_USER", payload });
};

// broadcast clear for other tabs. We will use this to clear user data between tabs
export const broadcastClear = () => {
  channel.postMessage({ type: "CLEAR_USER" });
};

// init broadcast listener for other tabs. We will use this to listen to messages from other tabs
export const initBroadcastListener = () => {
  channel.onmessage = (event) => {
    const { type, payload } = event.data;
    if (type === "SET_USER") {
      store.dispatch(setUser(payload));
    } else if (type === "CLEAR_USER") {
      store.dispatch(clearUser());
    }
  };
};
