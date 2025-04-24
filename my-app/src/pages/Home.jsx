import React from 'react';
import { Navbar,BelowNav, Products, Footer } from "../components";

function Home() {
  return (
    <>
      <Navbar />
      <BelowNav />
      <Products /> {/* Make sure this matches the exported component name */}
      <Footer />
    </>
  )
}

export default Home;