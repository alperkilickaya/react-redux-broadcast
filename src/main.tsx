import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { initBroadcastListener } from "./utils/broadcast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

import "./index.css";
import App from "./App.tsx";

initBroadcastListener();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
