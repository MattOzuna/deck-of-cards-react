import { render } from "@testing-library/react";
import Card from "../components/Card";

it("should render", () => {
  render(<Card />);
});

it("should match snapshot", () => {
  const { asFragment } = render(
    <Card
      image='img'
      value='6'
      suit="Hearts"
      key='1'
      idx='1'
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
