import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Games from "./";
import { FaHome } from "react-icons/fa";
import { basePath } from "../../Assets";

describe("Games", () => {
  let wrapper: ShallowWrapper;
  const mockUseState = jest.spyOn(React, "useState");
  const json = [
    "Games/1010",
    "Games/2048",
    "Games/2DotsChallenge",
    "Games/2WayRacing3D",
    "Games/3dCat",
  ];
  mockUseState.mockImplementation(() => [json, jest.fn()]);
  beforeEach(() => {
    wrapper = shallow(<Games />);
  });
  it("should render my close", () => {
    expect(wrapper.find(FaHome).length).toBe(1);
  });
  it("should render game list", () => {
    expect(wrapper.find(".game-title").length).toBe(json.length);
  });
  it("should render correct game link", () => {
    expect(wrapper.find(".game-title").at(1).children().prop("href")).toBe(
      `${basePath}${json[1]}`
    );
  });
});
