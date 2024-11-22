import React, { Component } from "react";
import { CartContextConsumer } from "../../../context/CartContext";
import { CurrencyContextConsumer } from "../../../context/CurrencyContext";
import ProductAttributes from "../productAttributes/ProductAttribute";
import arrowLeft from "../../../assets/arrow-left.svg";
import arrowRight from "../../../assets/arrow-right.svg";
import {
  StyledCarouselContainer,
  StyledCartProductCard,
  StyledDataGalleryCol,
  StyledDataInfoCol,
  StyledImageContainer,
  StyledPhotoIndexBtn,
  StyledPriceLabel,
  StyledProductBrand,
  StyledProductName,
  StyledProductQuantity,
  StyledQuantityBtn,
  StyledQuantityCol,
} from "./style";

export default class CartProductCard extends Component {
  state = {
    currentPhotoIndex: 0,
  };

  changeCurrentPhotoIndex = (index) => {
    this.setState({
      currentPhotoIndex:
        (this.state.currentPhotoIndex +
          index +
          this.props.product.data.product.gallery.length) %
        this.props.product.data.product.gallery.length,
    });
  };

  render() {
    const { brand, name, prices, attributes, gallery } =
      this.props.product.data.product;
    const { cartPage } = this.props;

    return (
      <CartContextConsumer>
        {({ removeFromCart, changeProductQuantity }) => (
          <StyledCartProductCard
            isOnCartPage={cartPage}
            data-testid="cart-item-container" // Add data-testid to the container
          >
            <StyledDataInfoCol isOnCartPage={cartPage}>
              <StyledProductBrand isOnCartPage={cartPage} data-testid="cart-item-brand">
                {brand}
              </StyledProductBrand>
              <StyledProductName isOnCartPage={cartPage} data-testid="cart-item-name">
                {name}
              </StyledProductName>
              <CurrencyContextConsumer>
                {({ currencyIndex }) => (
                  <StyledPriceLabel isOnCartPage={cartPage} data-testid="cart-item-price">
                    {prices[currencyIndex].currency.symbol}
                    {(prices[currencyIndex].amount).toFixed(2)}
                  </StyledPriceLabel>
                )}
              </CurrencyContextConsumer>
              {attributes.map((attribute) => (
                <ProductAttributes
                  isOnCartPage={cartPage}
                  attribute={attribute}
                  product={this.props.product}
                  key={attribute.name}
                  data-testid={`cart-item-attribute-${attribute.name.replace(/\s+/g, '-').toLowerCase()}`} // Dynamic data-testid based on attribute
                />
              ))}
            </StyledDataInfoCol>
            <StyledDataGalleryCol isOnCartPage={cartPage}>
              <StyledQuantityCol isOnCartPage={cartPage}>
                <StyledQuantityBtn
                  isOnCartPage={cartPage}
                  onClick={() => changeProductQuantity(this.props.product, 1)}
                  data-testid="cart-item-increase-quantity" // Add data-testid for increase button
                >
                  +
                </StyledQuantityBtn>
                <StyledProductQuantity isOnCartPage={cartPage} data-testid="cart-item-quantity">
                  {this.props.cart[this.props.index].quantity}
                </StyledProductQuantity>
                <StyledQuantityBtn
                  isOnCartPage={cartPage}
                  onClick={() =>
                    this.props.cart[this.props.index].quantity > 1
                      ? changeProductQuantity(this.props.product, -1)
                      : removeFromCart(
                          this.props.product.id,
                          this.props.product.attributes
                        )
                  }
                  data-testid="cart-item-decrease-quantity" // Add data-testid for decrease button
                >
                  -
                </StyledQuantityBtn>
              </StyledQuantityCol>
              <StyledImageContainer isOnCartPage={cartPage} data-testid="cart-item-image-container">
                <img src={gallery[this.state.currentPhotoIndex]} alt="" />
                {!this.props.cartPage || gallery.length < 2 ? null : (
                  <StyledCarouselContainer data-testid="cart-item-image-carousel">
                    <StyledPhotoIndexBtn
                      onClick={() => this.changeCurrentPhotoIndex(1)}
                      data-testid="cart-item-carousel-left"
                    >
                      <img src={arrowLeft} alt="" />
                    </StyledPhotoIndexBtn>
                    <StyledPhotoIndexBtn
                      onClick={() => this.changeCurrentPhotoIndex(-1)}
                      data-testid="cart-item-carousel-right"
                    >
                      <img src={arrowRight} alt="" />
                    </StyledPhotoIndexBtn>
                  </StyledCarouselContainer>
                )}
              </StyledImageContainer>
            </StyledDataGalleryCol>
          </StyledCartProductCard>
        )}
      </CartContextConsumer>
    );
  }
}
