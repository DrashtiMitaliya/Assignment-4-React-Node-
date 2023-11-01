import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/common/LoginForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/common/RegistrationForm";

import BusinessUserDashboard from "./views/businessUser/BusinessUserDashboard";
import AllPackagesPage from './views/mainAdmin/AllPackages'
import UserManagement from './views/businessUser/UserManagement'
import AddBusinessUser from './views/mainAdmin/AddBusinessUser'
import PackageForm from './components/package/PackageForm'



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
