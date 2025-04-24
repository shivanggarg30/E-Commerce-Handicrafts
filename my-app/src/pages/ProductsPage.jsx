import React from 'react'
import { Footer, Navbar } from "../components"
import Products from "../components/Products" // Adjust this import path as needed

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <Products />
      <Footer />
    </>
  )
}

export default ProductsPage