import React from "react";
import { shallow } from "enzyme";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("should render loading-spinner", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find(".loading-spinner").length).toBe(1);
  });
});
