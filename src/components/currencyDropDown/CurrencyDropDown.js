import { PureComponent } from "react";
import dropdownIconDown from "../../assets/dropdown-btn-down.svg";
import dropdownIconUp from "../../assets/dropdown-btn-up.svg";

import {
  StyledDropDownContainer,
  StyledDropDownCurrencyOption,
  StyledDropDownToggler,
  StyledDropDownWrapper,
} from "./style";

export default class DropDown extends PureComponent {
  state = {
    isOptionOpen: false,
    selectedCurrency: Number(localStorage.getItem("currencyIndex")) || 0,
    currencies: [
      { symbol: "$", label: "USD" }, 
      { symbol: "€", label: "Euro" } 
    ],
  };

  toggleOverlayVisibility = () => {
    this.setState({ isOptionOpen: !this.state.isOptionOpen });
  };

  changeCurrency = (index) => {
    this.setState({ selectedCurrency: index });
    localStorage.setItem("currencyIndex", index); 
    this.toggleOverlayVisibility();
  };
  handleClickOutside = (event) => {
    if (!event.target.closest(".drop-down")) {
      this.setState({ isOptionOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
    const { currencies, selectedCurrency, isOptionOpen } = this.state;

    return (
      <StyledDropDownWrapper className="drop-down">
        <StyledDropDownToggler onClick={this.toggleOverlayVisibility}>
          <span>{currencies[selectedCurrency].symbol}</span>
          <img
            src={isOptionOpen ? dropdownIconUp : dropdownIconDown}
            alt={`drop down indicator suggesting that drop down menu is currently ${isOptionOpen ? "open" : "closed"}`}
          />
        </StyledDropDownToggler>
       
        {isOptionOpen && (
          <StyledDropDownContainer>
            {currencies.map((currency, index) => (
              <StyledDropDownCurrencyOption
                isSelected={index === selectedCurrency}
                key={index}
                onClick={() => this.changeCurrency(index)}
              >
                {currency.symbol} {currency.label}
              </StyledDropDownCurrencyOption>
            ))}
          </StyledDropDownContainer>
        )}
      </StyledDropDownWrapper>
    );
  }
}
  

