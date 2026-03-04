import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import App from './App.tsx';
import BookingPage from './components/BookingPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import RegisterPage from './components/RegisterPage.tsx';
import AdminLoginPage from './components/AdminLoginPage.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import FacialContourPage from './components/FacialContourPage.tsx';
import BodySculptingPage from './components/BodySculptingPage.tsx';
import InjectionLiftingPage from './components/InjectionLiftingPage.tsx';
import HairTransplantPage from './components/HairTransplantPage.tsx';
import DentalPage from './components/DentalPage.tsx';
import FAQPage from './components/FAQPage.tsx';
import CasesPage from './components/CasesPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/facial-contour" element={<FacialContourPage />} />
          <Route path="/body-sculpting" element={<BodySculptingPage />} />
          <Route path="/injection-lifting" element={<InjectionLiftingPage />} />
          <Route path="/hair-transplant" element={<HairTransplantPage />} />
          <Route path="/dental" element={<DentalPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cases" element={<CasesPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
