import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Header from "./Header";
import Image from "next/image";
import { loadingGif } from "../Assets";

describe("Header", () => {
  let wrapper: ShallowWrapper;
  const mockUseState = jest.spyOn(React, "useState");
  const state = {
    visitCount: 10,
  };
  mockUseState.mockImplementation(() => [state, jest.fn()]);
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });
  it("should render identity", () => {
    expect(wrapper.find(".identity").length).toBe(1);
  });
  it("should render correct title", () => {
    expect(wrapper.find(Image).at(0).props().src).toBe(loadingGif);
  });
  it("should render correct visit-count", () => {
    expect(wrapper.find(".visit-count").at(0).props().children).toBe(state.visitCount);
  });
});
