import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import City from "./pages/City";
import Layout from "./components/Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city" element={<City />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
