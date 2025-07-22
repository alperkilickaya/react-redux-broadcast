// utils/broadcast.ts
import { store } from "../store/store";
import { setUser, clearUser } from "../store/userSlice";

const channel = new BroadcastChannel("auth-sync");

export const broadcastUser = (payload: {
  accessToken: string;
  refreshToken: string;
  name: string;
}) => {
  channel.postMessage({ type: "SET_USER", payload });
};

export const broadcastClear = () => {
  channel.postMessage({ type: "CLEAR_USER" });
};

export const initBroadcastListener = () => {
  console.log("initBroadcastListener", channel);
  channel.onmessage = (event) => {
    const { type, payload } = event.data;
    if (type === "SET_USER") {
      store.dispatch(setUser(payload));
    } else if (type === "CLEAR_USER") {
      store.dispatch(clearUser());
    }
  };
};
