import { render } from "@testing-library/react";
import React from "react";

import { App } from "../App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const element = getByText(/Life does not come without cost./i);
  expect(element).toBeInTheDocument();
});
