import React, { useEffect, useState } from "react";
import { fetchData } from "../api/ApiService";

function Product() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({}); // Cart state to store added products by ID

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Function to add a product to the cart
  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1, // Increment product count in cart
    }));
  };

  // Function to remove a product from the cart or reduce its quantity
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1; // Decrease quantity if more than one
      } else {
        delete updatedCart[productId]; // Remove product if quantity is one
      }
      return updatedCart;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container product_container mt-3">
      {data && data.products.length > 0 ? (
        data.products.slice(0, 10).map((product) => {
          const isInCart = cart[product.id] > 0; // Check if product is in cart
          const productCount = cart[product.id] || 0; // Get product count in cart

          return (
            <div key={product.id} className="product_card">
              <div className="badge">
               - ৳{" "}
                {Math.abs(
                  (
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  ).toFixed(2) - product.price
                ).toFixed(2)}
              </div>
              <div className="image_container align-content-center">
                <img
                  src={product.images?.[0] || "assets/img/Img 1.png"}
                  alt={product.name}
                  className="product_image"
                />
                <div className="overlay">
                  <button className="wishlist_button">
                    <i className="fa-regular fa-heart mr-2"></i>
                  </button>

                  {!isInCart ? (
                    <button
                      className="cart_button text-center"
                      onClick={() => addToCart(product.id)}
                    >
                      <i className="fa-solid fa-cart-plus rotate_180 mr-2"></i>
                      Add to cart
                    </button>
                  ) : (
                    <div className="cart_green text-center">
                      <span
                        className="decrease_button"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <i
                          className={`fa ${
                            productCount === 1 ? "fa-trash" : "fa-minus"
                          }`}
                        ></i>
                      </span>
                      {productCount} Added in the cart
                      <span
                        className="increase_button"
                        onClick={() => addToCart(product.id)}
                      >
                        <i className="fa fa-add"></i>
                      </span>
                    </div>
                  )}

                  <button className="quick_view_button">
                    <i className="fa-regular fa-eye mr-2"></i>
                    Quick View
                  </button>
                </div>
              </div>

              <div className="product_details">
                <div className="product_level">{product.brand}</div>
                <div className="product-name">{product.title}</div>
                <div className="price">
                  ৳{" "}
                  {(
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  ).toFixed(2)}{" "}
                  <span> ৳ {product.price}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Product;
