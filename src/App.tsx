import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import api from "./api/axios";
import { store } from "./store/store";
import { broadcastClear, broadcastUser } from "./utils/broadcast";
import { clearUser, invalidateAccessToken, setUser } from "./store/userSlice";

function App() {
  const handleLogin = async () => {
    const res = await api.post("/auth/login", {
      username: "emilys",
      password: "emilyspass",
    });
    const { accessToken, refreshToken, firstName } = res.data;

    // refresh token sahte olarak atıyoruz
    const user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      name: firstName,
    };
    console.log("userrrr", user);
    store.dispatch(setUser(user));
    broadcastUser(user);
  };

  const handleLogout = () => {
    store.dispatch(clearUser());
    broadcastClear();
  };

  const handleInvalidateAccessToken = () => {
    store.dispatch(invalidateAccessToken());
    //console.log redux user state
    console.log(store.getState().user);
  };

  const handleGetUser = async () => {
    const res = await api.get("/auth/me");
    console.log(res.data);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
        }}
      >
        <div className="card">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="card">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
        }}
      >
        <div className="card">
          <button onClick={handleGetUser}>Get User</button>
        </div>
        <div className="card">
          <button onClick={handleInvalidateAccessToken}>
            Invalidate Access Token
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
