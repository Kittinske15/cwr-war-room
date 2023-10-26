import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Test from './test';
import China from './pages/China';
import Thailand from './pages/Thailand';
import India from './pages/India';
import CoporateStock from './pages/CoporateStock';
import OverseaStock from './pages/OverseaStock';
import GDPCapita from './pages/GDPCapita';
import Population from './pages/Population';
import ImportGood from './pages/ImportGood';
import InflationRate from './pages/InflationRate';
import UnemploymentRate from './pages/UnemploymentRate';
import GDPCapitaDetail from './components/GDPCapitaDetail';
import InflationDetail from './components/InflationDetail';
import ImportGoodDetail from './components/ImportGood';
import UnemploymentRateDetail from './components/UnemploymentRateDetail';
import CPMap from './pages/CPMap';
import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/China" element={<China />} />
      <Route path="/Thailand" element={<Thailand />} />
      <Route path="/India" element={<India />} />
      <Route path="/stock" element={<CoporateStock />} />
      <Route path="/oversea" element={<OverseaStock />} />
      <Route path="/gdp-capita" element={<GDPCapita />} />
      <Route path="/gdp-capita-detail" element={<GDPCapitaDetail />} />
      <Route path="/population" element={<Population />} />
      <Route path="/import-good" element={<ImportGood />} />
      <Route path="/import-good-detail" element={<ImportGoodDetail />} />
      <Route path="/inflation-rate" element={<InflationRate />} />
      <Route path="/inflation-rate-detail" element={<InflationDetail />} />
      <Route path="/unemployment-rate" element={<UnemploymentRate />} />
      <Route path="/unemployment-rate-detail" element={<UnemploymentRateDetail />} />
      <Route path="/cp-map" element={<CPMap />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();