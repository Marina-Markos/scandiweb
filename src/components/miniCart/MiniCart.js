import React, { PureComponent } from "react";
import emptyCartIcon from "../../assets/empty-cart.svg";
import { CartContextConsumer } from "../../context/CartContext";
import { CurrencyContextConsumer } from "../../context/CurrencyContext";
import CartProductCard from "../product/productCardCart/CartProductCard";
import { withRouter } from "react-router-dom";
import {
  StyledButtonsContainer,
  StyledCartIconContainer,
  StyledCartProductsContainer,
  StyledMiniCart,
  StyledOverlay,
  StyledOverlayContent,
  StyledOverlayContentEmpty,
  StyledOverlayFooter,
  StyledOverlayFooterCTA,
  StyledOverlayHeader,
  StyledOverlayHeading,
  StyledOverlayHeadingItemsValue,
  StyledTotalPriceContainer,
  StyledTotalPriceText,
  StyledTotalPriceValue,
} from "./style";

class MiniCart extends PureComponent {
  state = {
    isOverlayOpen: false,
  };

  toggleOverlay = () => {
    this.setState({ isOverlayOpen: !this.state.isOverlayOpen });
  };

  goToCartPage = () => {
    this.props.history.push("/cart");
    this.toggleOverlay();
  };

  componentDidUpdate() {
    if (this.state.isOverlayOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }

  handleClickOutside = (event) => {
    if (
      !event.target.closest(".mini-cart") ||
      event.target.matches(".overlay")
    ) {
      this.setState({ isOverlayOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <StyledMiniCart>
        <CartContextConsumer>
          {({ cart, getTotalInCartItemsQuantity, getTotalPrice, decreaseItemQuantity, increaseItemQuantity }) => (
            <div className="mini-cart">
              <StyledCartIconContainer
                length={getTotalInCartItemsQuantity}
                className="cart-icon"
                onClick={this.toggleOverlay}
              >
                <img src={emptyCartIcon} alt="shopping cart icon" />
              </StyledCartIconContainer>
              {this.state.isOverlayOpen && (
                <>
                  <StyledOverlay className="overlay"></StyledOverlay>
                  {cart.length > 0 ? (
                    <StyledOverlayContent>
                      <StyledOverlayHeader>
                        <StyledOverlayHeading>
                          My Bag,{" "}
                          <StyledOverlayHeadingItemsValue>
                            {getTotalInCartItemsQuantity}{" "}
                            {getTotalInCartItemsQuantity > 1 ? "items" : "item"}
                          </StyledOverlayHeadingItemsValue>
                        </StyledOverlayHeading>
                      </StyledOverlayHeader>
                      <StyledCartProductsContainer>
                        {cart.map((product, index) => (
                          <CartProductCard
                            key={index}
                            product={product}
                            index={index}
                            cart={cart}
                            renderQuantityControls={() => (
                              <div>
                                <button
                                  data-testid='cart-item-amount-decrease'
                                  onClick={() => decreaseItemQuantity(product.id)} // Function to decrease the quantity
                                >
                                  Decrease
                                </button>
                                <span data-testid='cart-item-amount'>
                                  {product.quantity} {/* Displaying the quantity here */}
                                </span>
                                <button
                                  data-testid='cart-item-amount-increase'
                                  onClick={() => increaseItemQuantity(product.id)} // Function to increase the quantity
                                >
                                  Increase
                                </button>
                              </div>
                            )}
                          />
                        ))}
                      </StyledCartProductsContainer>
                      <StyledOverlayFooter>
                        <StyledTotalPriceContainer>
                          <StyledTotalPriceText>
                            Total Price
                          </StyledTotalPriceText>
                          <CurrencyContextConsumer>
                            {({ currencyIndex }) => (
                              <StyledTotalPriceValue data-testid='cart-total'>
                                {getTotalPrice(currencyIndex)} {/* Adding data-testid here */}
                              </StyledTotalPriceValue>
                            )}
                          </CurrencyContextConsumer>
                        </StyledTotalPriceContainer>
                        <StyledButtonsContainer>
                          <StyledOverlayFooterCTA
                            onClick={() => this.goToCartPage()}
                          >
                            view bag
                          </StyledOverlayFooterCTA>
                          <StyledOverlayFooterCTA
                            checkout
                            onClick={() => this.goToCartPage()}
                          >
                            checkout
                          </StyledOverlayFooterCTA>
                        </StyledButtonsContainer>
                      </StyledOverlayFooter>
                    </StyledOverlayContent>
                  ) : (
                    <StyledOverlayContentEmpty>
                      <span>Your cart is empty </span>
                    </StyledOverlayContentEmpty>
                  )}
                </>
              )}
            </div>
          )}
        </CartContextConsumer>
      </StyledMiniCart>
    );
  }
}

export default withRouter(MiniCart);
