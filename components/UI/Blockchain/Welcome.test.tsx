import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Welcome from "./Welcome";
import { aRandomString } from "../../util/testData";
import { SiEthereum } from "react-icons/si";

describe("Welcome", () => {
  const connectWallet = jest.fn(),
    handleChange = jest.fn(),
    sendTransaction = jest.fn();
  let wrapper: ShallowWrapper;
  const props = {
    isLoading: false,
    isConnecting: true,
    currentAccount: aRandomString(),
    formData: {
      addressTo: aRandomString(),
      amount: aRandomString(),
      keyword: aRandomString(),
      message: aRandomString(),
    },
    connectWallet,
    handleChange,
    sendTransaction,
  };
  beforeEach(() => {
    wrapper = shallow(<Welcome {...props} />);
  });
  it("should render send-now", () => {
    expect(wrapper.find(".send-now").length).toBe(1);
  });
  it("should render SiEthereum Icon", () => {
    const searchInputProps = wrapper.find(SiEthereum).props();
    expect(searchInputProps.fontSize).toEqual(24);
  });
  it("should render connect button when currentAccount is valid", () => {
    expect(wrapper.find(".connect-btn").length).toBe(0);
  });
});
