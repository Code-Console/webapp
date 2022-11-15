import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import HTMLHeader from "./HTMLHeader";
import { ogImg } from "../Assets";

describe("HTMLHeader", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<HTMLHeader />);
  });
  it("should render my close", () => {
    expect(wrapper.find("title").at(0).props().children).toBe(
      "Web/App Developer"
    );
  });
  it("should render correct og image", () => {
    expect(
      wrapper
        .find("meta")
        .filterWhere((item) => {
          return item.prop("property") === "og:image";
        })
        .at(0)
        .props().content
    ).toBe(ogImg);
  });
});
