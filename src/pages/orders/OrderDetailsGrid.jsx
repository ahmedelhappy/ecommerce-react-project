import { Fragment } from "react";
import dayjs from "dayjs";
import { Link } from "react-router";
import axios from "axios";

export function OrderDetailsGrid({ order, BuyAgainIcon, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((product) => {
        const addToCart = async () => {
          await axios.post("/api/cart-items", {
            productId: product.productId,
            quantity: 1,
          });
          await loadCart();
        };
        return (
          <Fragment key={product.productId}>
            <div className="product-image-container">
              <img src={product.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{product.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(product.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {product.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              {/* <Link to={`/tracking/${order.id}/${product.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link> */}
              <a href={`/tracking/${order.id}/${product.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
