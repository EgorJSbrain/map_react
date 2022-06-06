import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage, Layout, SearchPage } from "./pages";
import { CssBaseline } from '@mui/material';

const App = () => (
  <BrowserRouter>
  <CssBaseline />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="app" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="dashboard" />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
