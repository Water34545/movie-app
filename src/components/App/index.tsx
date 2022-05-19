import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import WatchlListPage from "../../pages/WatchlList";
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
        <Route path="/watchlist" element={<PrivateRoute><WatchlListPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
