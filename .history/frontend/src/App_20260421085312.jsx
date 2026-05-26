import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      
      {isLogin ? (
        <Login switchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register switchToLogin={() => setIsLogin(true)} />
      )}

    </div>
  );
}

export default App;