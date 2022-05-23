import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import FavoriteListPage from "../../pages/FavoriteList";
import Film from "../../pages/Film/indx";
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
        <Route path="/favorite" element={<PrivateRoute><FavoriteListPage /></PrivateRoute>} />
        <Route path="/:movie_id" element={<Film/>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
