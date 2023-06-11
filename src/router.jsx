import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import SignUp from "./views/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/sign-up" element={<SignUp />} />

    </Route>
  )
);

export default router;
