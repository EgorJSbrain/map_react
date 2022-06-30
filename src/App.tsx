import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { CardsPage, HomePage, Layout, SearchPage } from './pages';

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
