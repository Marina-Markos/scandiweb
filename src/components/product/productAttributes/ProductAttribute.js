import React, { PureComponent } from "react";
import {
  StyledAttributeBox,
  StyledAttributeBoxText,
  StyledAttributeNameLabel,
  StyledAttributesContainer,
  StyledAttributesWrapper,
  StyledSwatchAttributeBox,
} from "./style";

// Utility function to convert a string to kebab case
const toKebabCase = (str) => {
  return str
    .toLowerCase()                     // Convert to lower case
    .replace(/\s+/g, '-')              // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')          // Remove all non-word characters
    .replace(/\-\-+/g, '-')            // Replace multiple hyphens with a single hyphen
    .trim();                           // Trim whitespace
};

export default class ProductAttribute extends PureComponent {
  render() {
    const { attribute, product, isOnCartPage } = this.props;

    return (
      <StyledAttributesWrapper>
        <StyledAttributeNameLabel isOnCartPage={isOnCartPage}>
          {attribute.name}:
        </StyledAttributeNameLabel>
        
        {/* Main attributes container with data-testid */}
        <StyledAttributesContainer data-testid={`product-attribute-${toKebabCase(attribute.name)}`}>
          {attribute.type !== "swatch"
            ? attribute.items.map((item) => (
                <StyledAttributeBox
                  isOnCartPage={isOnCartPage}
                  key={item.value}
                  className={
                    Object.values(product.attributes)[
                      Object.keys(product.attributes).indexOf(attribute.name)
                    ] === item.displayValue
                      ? "selected-swatch"
                      : ""
                  }
                >
                  <StyledAttributeBoxText isOnCartPage={isOnCartPage}>
                    {item.value}
                  </StyledAttributeBoxText>
                </StyledAttributeBox>
              ))
            : attribute.items.map((item) => (
                <StyledSwatchAttributeBox
                  isOnCartPage={isOnCartPage}
                  key={item.value}
                  className={
                    Object.values(product.attributes)[
                      Object.keys(product.attributes).indexOf(attribute.name)
                    ] === item.displayValue
                      ? "selected"
                      : ""
                  }
                  color={item.value}
                />
              ))}
        </StyledAttributesContainer>
      </StyledAttributesWrapper>
    );
  }
}
