import React, { useState } from "react";
import { Button } from "react-bootstrap";

function QuantityBtn(props) {
  const maxQuantity = props.maxQuantity;
  console.log(maxQuantity);
  const [quantity, setQuantity] = useState(1);

  function increaseCount() {
    setQuantity(quantity + 1);
  }

  function decreaseCount() {
    setQuantity(quantity - 1);
  }

  return (
    <div className="quantity-component">
      <Button
        variant="primary"
        size="sm"
        type="button"
        onClick={decreaseCount}
        disabled={quantity === 0 ? true : false}
      >
        <i className="fa-solid fa-minus"></i>
      </Button>
      <div className="quantity-div">{quantity === 0 ? 0 : quantity}</div>
      <Button
        variant="primary"
        size="sm"
        type="button"
        onClick={increaseCount}
        disabled={quantity === maxQuantity ? true : false}
      >
        <i className="fa-solid fa-plus"></i>
      </Button>
    </div>
  );
}

export default QuantityBtn;
