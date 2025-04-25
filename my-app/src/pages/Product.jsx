import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action/index.js";
import { Footer, Navbar } from "../components";
// import initializeFirebase from "../utils/FirebaseInit";
/*
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit
} from "firebase/firestore";
*/

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      // Mock data loading for frontend-only preview
      // You can replace this with static JSON or dummy content as needed

      try {
        // const { db } = initializeFirebase(); // Lazy initialize Firebase and get Firestore db

        // const docRef = doc(db, "products", id);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   const productData = { id: docSnap.id, ...docSnap.data() };
        const productData = {
          id: id,
          name: "Sample Product",
          category: "Handicrafts",
          price: 999,
          description: "A beautiful handcrafted item.",
          imageUrl: "https://via.placeholder.com/400",
          rating: { rate: 4.5 },
        };

        setProduct(productData);

        const similarItems = Array.from({ length: 4 }, (_, i) => ({
          id: `similar-${i}`,
          name: `Similar Product ${i + 1}`,
          imageUrl: "https://via.placeholder.com/300",
        }));

        setSimilarProducts(similarItems);

        // } else {
        //   console.log("No such document!");
        // }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
        setLoading2(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.imageUrl}
            alt={product.name}
            width="400px"
            height="400px"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/400/400";
            }}
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          {product.rating && (
            <p className="lead">
              {product.rating.rate} <i className="fa fa-star"></i>
            </p>
          )}
          <h3 className="display-6 my-4">Rs. {product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mx-4">
            <Skeleton height={400} width={250} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.imageUrl}
              alt={item.name}
              height={300}
              width={300}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/300/300";
              }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {item.name && item.name.length > 15
                  ? `${item.name.substring(0, 15)}...`
                  : item.name}
              </h5>
            </div>
            <div className="card-body">
              <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => addProduct(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            {similarProducts.length > 0 ? (
              <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
                {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
              </Marquee>
            ) : (
              <p>No similar products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
