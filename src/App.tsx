import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CardsPage, HomePage, Layout, SearchPage } from "./pages";
import { CssBaseline } from '@mui/material';

export const App = () => (
  <>
  <CssBaseline />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="app" element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="dashboard" />
      </Route>
    </Routes>
  </>
);
