import React from "react";
// import Header from "./Header.js";
import Footer from "./Footer.js";
import BookSearch from "./BookSearch.js";
import CallToAction from "./CallToAction.js";
import HeroCarousel from "./HeroCarousel.js";
import Testimonials from "./Testimonials.js";

function Home() {
  return (
    <div className="bg-light">
      {/* <Header /> */}
      <main>
        <HeroCarousel />
        <CallToAction />
        <BookSearch />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
