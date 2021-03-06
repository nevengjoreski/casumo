import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("Test", () => {
  test("Loading Component", () => {
    const { getByText } = render(<App />);
    const tree = getByText("Preparing Your Library");
    expect(tree).toBeInTheDocument();
  });
});
