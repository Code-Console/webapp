import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import About from "./About";
import { aRandomString } from "../util/testData";

describe("About", () => {
  let wrapper: ShallowWrapper;
  const onClose = jest.fn();
  const title = aRandomString();
  beforeEach(() => {
    wrapper = shallow(<About onClose={onClose} title={title} />);
  });
  it("should render close", () => {
    expect(wrapper.find(".close").length).toBe(1);
  });
  it("should render correct title", () => {
    expect(wrapper.find("h1").at(0).props().children).toBe(title);
  });
});
