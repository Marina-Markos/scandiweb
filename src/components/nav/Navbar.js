import React, { PureComponent } from "react";
import MiniCart from "../miniCart/MiniCart";
import CurrencyDropDown from "../currencyDropDown/CurrencyDropDown";
import { LOAD_CATEGORIES, GET_AVAILABLE_PRICES } from "../../GraphQL/Queries";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "react-router-dom";
import logoIcon from "../../assets/a-logo.svg";
import {
  StyledLogoImg,
  StyledNavbarItemsContainer,
  StyledNavLink,
  StyledUl,
} from "./style";
import Spinner from "../Spinner";

class Navbar extends PureComponent {
  render() {
    // Get the current pathname from the router props to determine active link
    const { location } = this.props;
    const currentPath = location.pathname.split("/")[1]; // Get the category name from the URL path

    return (
      <header>
        <StyledUl>
          <StyledNavbarItemsContainer>
            <Query query={LOAD_CATEGORIES}>
              {({ loading, data, error }) => {
                if (loading) return <Spinner small />;
                if (error) return <span>something went wrong :(</span>;
                if (data.categories) {
                  return data.categories.map((category) => (
                    <StyledNavLink
                      key={category.name}
                      to={"/" + category.name}
                      data-testid="category-link" // Apply the category-link test ID
                      // Check if this category matches the current path to mark it as active
                      className={currentPath === category.name ? "active" : ""}
                      data-testid={currentPath === category.name ? "active-category-link" : "category-link"} // Dynamically set test ID for active link
                    >
                      {category.name}
                    </StyledNavLink>
                  ));
                }
              }}
            </Query>
          </StyledNavbarItemsContainer>

          <StyledLogoImg src={logoIcon} alt="e commerce store logo" />

          <Query query={GET_AVAILABLE_PRICES}>
            {({ loading, data, error }) => {
              if (loading) return <Spinner small />;
              if (error) return <span>something went wrong :( </span>;
              if (data) {
                return (
                  <StyledNavbarItemsContainer>
                    <CurrencyDropDown prices={data.currencies} />
                    <MiniCart />
                  </StyledNavbarItemsContainer>
                );
              }
            }}
          </Query>
        </StyledUl>
      </header>
    );
  }
}

export default withRouter(Navbar);
