import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./common/Header";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CoursesPage from "./CoursesPage";
import NotFoundPage from "./NotFoundPage";
import ManageCoursePage from "./ManageCoursePage";
import ManageAuthorPage from "./ManageAuthorPage";
import AuthorsPage from "./AuthorsPage";

function App() {
  /*
  // Native routing using JS
  function getPage() {
    const route = window.location.pathname;

    if (route === "/about") return <AboutPage />;
    if (route === "/courses") return <CoursesPage />;
    return <HomePage />;
  }
  return (
    <div>
      <Header />
      {getPage()}
    </div>
  );
  */

  // Routing using react-router-dom BrowserRouter
  // Redirecting /about-page to /about
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:slug" element={<ManageCoursePage />} />
        <Route path="/course/" element={<ManageCoursePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/author/:slug" element={<ManageAuthorPage />} />
        <Route path="/author" element={<ManageAuthorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-page" element={<Navigate to="/about" />} />
        <Route path="/error-page" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
