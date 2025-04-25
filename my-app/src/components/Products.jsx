import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import initializeFirebase from "../utils/FirebaseInit"; // 🔥 Firebase Init (commented)
// import { collection, onSnapshot } from "firebase/firestore"; // 🔥 Firestore methods (commented)

const Products = () => {
  // const { db } = initializeFirebase(); // 🚫 Firebase service (commented)

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchProducts = () => {
    //   setLoading(true);
    //   const productsCollectionRef = collection(db, "products");

    //   const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
    //     const products = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setData(products);
    //     setFilter(products);
    //     setLoading(false);
    //   });

    //   return () => unsubscribe();
    // };

    // fetchProducts();

    // 🔧 Mock data for frontend-only testing
    const mockProducts = [
      {
        id: "1",
        name: "Clay Pot",
        description: "Handmade eco-friendly clay pot.",
        price: 250,
        category: "clay",
        imageUrl: "./assets/Clay-pot.png"
      },
      {
        id: "2",
        name: "Kashmere Shawl",
        description: "A classic pure kashmiri shawl (doshala) woven on a handloom.",
        price: 500,
        category: "textile",
        imageUrl: "./assets/kashmere-shawl.png"
      },
      {
        id: "3",
        name: "Wooden Sculpture",
        description: "Artistic wooden sculpture made by local artisans.",
        price: 800,
        category: "wood",
        imageUrl: "./assets/wooden-sculpture.png"
      },
      {
        id: "4",
        name: "Bamboo Basket",
        description: "Eco-friendly bamboo basket for multipurpose use.",
        price: 250,
        category: "bamboo",
        imageUrl: "./assets/bamboo-basket.png"
      },
    
      {
        id: "5",
        name: "Block Fabric",
        description: "Block Printed Handmade Fabric - 8 meters",
        price: 700,
        category: "textile",
        imageUrl: "./assets/block-fabric.png"
      },
      {
        id: "6",
        name: "Cotton Handmade muslin",
        description: "Jamdani is a woven fabric in cotton. This is a supplementary weft technique of weaving, where the artistic motifs are produced by a non-structural weft, in addition to the standard weft that holds the warp threads together. The standard weft creates a fine, sheer fabric while the supplementary weft with thicker threads adds the intricate patterns to it. Jamdani is a fine muslin cloth on which decorative motifs are woven on the loom, typically in grey and white. Often a mixture of cotton and gold thread was used.",
        price: 4000,
        category: "textile",
        imageUrl: "./assets/muslin.png"
      }

    ];

    setTimeout(() => {
      setData(mockProducts);
      setFilter(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (category) => {
    if (category === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((product) => product.category === category);
      setFilter(updatedList);
    }
  };

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const getUniqueCategories = () => {
    return ['all', ...new Set(data.map(product => product.category))];
  };

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        {getUniqueCategories().map((category) => (
          <button
            key={category}
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct(category)}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {filter.length > 0 ? (
        <div className="row">
          {filter.map((product) => (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.imageUrl}
                  alt={product.name}
                  height={300}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/300/300";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name && product.name.length > 15
                      ? `${product.name.substring(0, 15)}...`
                      : product.name}
                  </h5>
                  <p className="card-text">
                    {product.description && product.description.length > 90
                      ? `${product.description.substring(0, 90)}...`
                      : product.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rs. {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-12 text-center">
          <p>No products found in this category.</p>
        </div>
      )}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Handcrafted Treasures</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">{loading ? <Loading /> : <ShowProducts />}</div>
    </div>
  );
};

export default Products;
