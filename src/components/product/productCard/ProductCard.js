import React, { PureComponent } from "react";
import { CurrencyContextConsumer } from "../../../context/CurrencyContext";
import { CartContextConsumer } from "../../../context/CartContext";
import { withRouter } from "react-router-dom";
import emptyCartIcon from "../../../assets/empty-cart-white.svg";
import {
  StyledAddToCartBadge,
  StyledProduct,
  StyledProductCoverImage,
  StyledProductImageContainer,
  StyledProductNameLabel,
  StyledProductPriceLabel,
} from "./style";

// Utility function to convert a string to kebab case
const toKebabCase = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim(); // Trim whitespace
};

class ProductCard extends PureComponent {
  state = {
    addToCartBadgeVisible: false,
  };

  handleMouseOver = () => {
    this.setState({ addToCartBadgeVisible: true });
  };

  handleMouseOut = () => {
    this.setState({ addToCartBadgeVisible: false });
  };

  addedToCartAnimation = () => {
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.classList.add("cart-icon-animation");
    setTimeout(() => {
      cartIcon.classList.remove("cart-icon-animation");
    }, 300);
  };

  render() {
    const { inStock, id, prices, name, gallery, attributes, category } =
      this.props.product;

    const atr = attributes.map((attribute) => ({
      [attribute.name]: attribute.items[0].displayValue,
    }));

    const defaultAttributesObj = Object.assign({}, ...atr);
    const productNameKebabCase = toKebabCase(name); // Convert product name to kebab case

    return (
      <StyledProduct
        data-testid={`product-${productNameKebabCase}`} // Add data-testid attribute
        onClick={(e) =>
          e.target.id !== "add-to-cart-btn" &&
          e.target.id !== "cart-icon" &&
          this.props.history.push("/" + category + "/" + id)
        }
        available={inStock}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <StyledProductImageContainer available={inStock}>
          {!inStock || !this.state.addToCartBadgeVisible ? null : (
            <CartContextConsumer>
              {({ addToCart }) => (
                <StyledAddToCartBadge
                  id="add-to-cart-btn"
                  onClick={() => {
                    addToCart({
                      data: this.props,
                      quantity: 1,
                      id: id,
                      attributes: defaultAttributesObj,
                    });
                    this.addedToCartAnimation();
                  }}
                >
                  <img id="cart-icon" src={emptyCartIcon} alt="" />
                </StyledAddToCartBadge>
              )}
            </CartContextConsumer>
          )}
          <StyledProductCoverImage src={gallery[0]} alt={name} />
        </StyledProductImageContainer>
        <StyledProductNameLabel>{name}</StyledProductNameLabel>
        <CurrencyContextConsumer>
          {({ currencyIndex }) => (
            <StyledProductPriceLabel>
              {prices[currencyIndex].currency.symbol}
              {prices[currencyIndex].amount.toFixed(2)}
            </StyledProductPriceLabel>
          )}
        </CurrencyContextConsumer>
      </StyledProduct>
    );
  }
}

export default withRouter(ProductCard);
