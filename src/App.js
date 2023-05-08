import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register";
import { Login } from "./pages/login/login";
import { CreateJob } from "./pages/buyer/job-order";
import { Order } from "./pages/maker/view-jobs";
import { SendQuote } from "./pages/maker/send-quote";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./pages/home/home";
import { BuyerQuote } from "./pages/buyer/received-quote/received-quote";
import { PostedJobs } from "./pages/buyer/posted-job/posted-job";
import { Submitted } from "./pages/maker/submitted-quote/submitted-quote";
import { AcceptQuotations } from "./pages/maker/accept-quotes/accept-quotes";
import { UserProfile } from "./components/user-profile/user-profile";
import { Footer } from "./components/footer/footer";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/buyer/jobOrder" element={<CreateJob />} />
          <Route exact path="/maker/viewJob" element={<Order />} />
          <Route exact path="/maker/sendQuote" element={<SendQuote />} />
          <Route exact path="/nav" element={<NavBar />} />
          <Route exact path="/receivedQuote" element={<BuyerQuote />} />
          <Route exact path="/jobsById" element={<PostedJobs />} />
          <Route exact path="/quoteById" element={<Submitted />} />
          <Route exact path="/acceptQuotes" element={<AcceptQuotations />} />
          <Route exact path="/userDetails" element={<UserProfile />} />
          <Route exact path="/footer" element={<Footer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
