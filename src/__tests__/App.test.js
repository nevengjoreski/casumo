import React from "react";
import renderer from "react-test-renderer";
import App from "../App";

describe("App Creation", () => {
  it("should render properly", () => {
    const component = renderer.create(<App />);
    expect(component).toMatchSnapshot();
  });
});
