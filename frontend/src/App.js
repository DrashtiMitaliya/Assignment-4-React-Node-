import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PackageForm from "./components/package/PackageForm";
import LoginForm from "./views/Login/LoginForm";
import RegistrationForm from "./views/Registration/RegistrationForm";
import AllPackagesPage from "./views/User/mainAdmin/AllPackages";
import BusinessUserDashboard from "./views/User/businessUser/BusinessUserDashboard";
import UserManagement from "./views/User/businessUser/UserManagement";
import AddBusinessUser from "./views/User/mainAdmin/AddBusinessUser";

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
