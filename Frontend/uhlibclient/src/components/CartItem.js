import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { item, amount } = cartItem;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img class="pr-4"
                src={item.imageLink}
                alt={item.item_type}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {item.title}{" "}
              <span className="tag is-primary">${item.price}</span>
            </b>
            <div>{item.quantity}</div>
            <small>{`${amount} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;