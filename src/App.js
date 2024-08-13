import "./App.css";
import { LoginBox } from "./Components/LoginBox/LoginBox";
import { AuthProvider } from "./Context/AuthContext";

//npx json-server db.json --port 3004
//npm start

function App() {
  return (
    <AuthProvider>
      <LoginBox />
    </AuthProvider>
  );
}

export default App;
