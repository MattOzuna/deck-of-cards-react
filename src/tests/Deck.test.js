import { render } from "@testing-library/react";
import Deck from "../components/Deck";

it("should render", () => {
  render(<Deck />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Deck />);
  expect(asFragment()).toMatchSnapshot();
});
