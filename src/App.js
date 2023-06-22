import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { createContext, lazy, Suspense } from "react";
import events from "./data/EventData/EventData";

export const AppContext = createContext();

const Home = lazy(() => import("./pages/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const DetailsPage = lazy(() => import("./components/DetailsPage/DetailsPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

function App() {
  return (
    <AppContext.Provider value={events}>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading.....!</h1>}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:title" element={<DetailsPage />} />
              <Route path="registerpage" element={<RegisterPage />} />
            </Routes>
            <Footer />
          </div>
        </Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
