import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Blockchain from "./";

describe("Blockchain", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Blockchain />);
  });
  it("should render my close", () => {
    expect(wrapper.find(".close").length).toBe(1);
  });
});
