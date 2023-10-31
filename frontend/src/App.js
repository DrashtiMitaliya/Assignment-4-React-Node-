import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/common/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/common/RegistrationForm";
import MainAdminDashboard from "./components/mainAdmin/MainAdminDashboard";
import BusinessUserDashboard from "./components/businessUser/BusinessUserDashboard";
import PackageForm from "./components/common/PackageForm";
import AllPackagesPage from "./components/common/AllPackages";
import UserManagement from "./components/businessUser/UserManagement";
import AddBusinessUser from "./components/mainAdmin/AddBusinessUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/all-packages" element={<AllPackagesPage />} />
        <Route path="/business-user" element={<BusinessUserDashboard />} />
        <Route path="/add-package" element={<PackageForm />} />
        <Route path="/add-business-user" element={<UserManagement />} />
        <Route path="/businnesuserform" element={<AddBusinessUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
