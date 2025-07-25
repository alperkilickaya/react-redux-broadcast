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

    // set user to redux store
    const user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      name: firstName,
    };
    store.dispatch(setUser(user));

    // broadcast user for other tabs
    broadcastUser(user);
  };

  const handleLogout = () => {
    store.dispatch(clearUser());

    // broadcast clear for other tabs
    broadcastClear();
  };

  const handleInvalidateAccessToken = () => {
    // invalidate access token for demo purposes
    store.dispatch(invalidateAccessToken());
  };

  const handleGetUser = async () => {
    const res = await api.get("/auth/me");
    console.log("User Info:", res.data);
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
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div className="card">
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="card">
            <button onClick={handleGetUser}>Get User</button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div className="card">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="card">
            <button onClick={handleInvalidateAccessToken}>
              Invalidate Access Token
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
