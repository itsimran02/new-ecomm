import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import SiderBar from "./components/SiderBar";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiderBar />} />
        <Route
          path="/product/:id"
          element={<ProductPage />}
        />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
