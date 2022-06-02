import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { SearchPage } from "./pages/SearchPage";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
