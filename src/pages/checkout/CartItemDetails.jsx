import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      setIsUpdatingQuantity(false);
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(newQuantity),
      });
      await loadCart();
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const changeQuantity = (event) => {
    setNewQuantity(event.target.value);
  };

  // const sendNewQuantity = async() => {
  //   // send it
  //   await axios.put
  //   // show it
  // }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input
                type="text"
                className="quantity-textbox"
                onChange={changeQuantity}
                onBlur={updateQuantity}
                onKeyDown={(event)=> {if(event.key === "Enter") {updateQuantity()}} }
                value={newQuantity}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>

          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
