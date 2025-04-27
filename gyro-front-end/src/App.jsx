import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HistoryPage from "./pages/History/HistoryPage.jsx";
import BarChart from "./pages/DashBoard/DashBoardBottom/BarChart.jsx";
import DashPage from "./pages/DashBoard/DashPage";
import StockPage from "./pages/Estoque/StockPage.jsx";
import EmployeePage from "./pages/Employee/EmployeePage";
import OrderPage from "./pages/Order/OrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/barchart" element={<BarChart />} />
        <Route path="/dashboard" element={<BarChart />} />
        <Route path="/dashPage" element={<DashPage />} />
        <Route path="/stock" element={<StockPage/>} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/order" element={<OrderPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
