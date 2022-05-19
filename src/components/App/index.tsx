import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import FavoritePage from "../../pages/Favorite";
import HomePage from "../../pages/Home";
import LoginPage from "../../pages/Login";
import Header from '../Header';
import PrivateRoute from "../PrivateRoute";

const App = () => {

  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorite" element={<PrivateRoute><FavoritePage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
