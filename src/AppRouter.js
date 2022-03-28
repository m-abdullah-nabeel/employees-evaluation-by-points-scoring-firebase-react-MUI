import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Test from "./components/test"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepForm from "./components/home/MultiStepForm";
import Container from '@mui/material/Container';

// import UserProvider from "./providers/UserProvider";

const AppRouter = () => {
    return (
      <>
        <BrowserRouter>

          <Header/>
          <Container>
            <Routes>
              <Route index element={<MultiStepForm />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="charts" element={<Charts />} />
              <Route path="bounty" element={<Bounty />} />
              <Route path="admin" element={<Admin />} />
              <Route path="test" element={<Test />} />
              <Route path="*" element={<ErrorPAge />} />
            </Routes>
          </Container>
          <Footer/>
        </BrowserRouter>
      </>
    );
}

export default AppRouter;
