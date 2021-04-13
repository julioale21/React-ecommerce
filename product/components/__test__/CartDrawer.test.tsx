import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import CartDrawer from "../CartDrawer";
import { CartItem } from "../../types";

const cart: CartItem[] = [
  {
    id: "id",
    category: "category",
    description: "description",
    image: "image",
    price: 100,
    title: "title",
    quantity: 2,
  },
];

test("should call onDecrement when subtract a product ", () => {
  const onDecrement = jest.fn();

  render(
    <CartDrawer
      isOpen
      items={cart}
      onClose={jest.fn()}
      onDecrement={onDecrement}
      onIncrement={jest.fn()}
    />,
  );

  fireEvent.click(screen.getByTestId("decrement"));
  expect(onDecrement).toHaveBeenCalled();
});

test("should call onIncrement when plus a product ", () => {
  const onIncrement = jest.fn();

  render(
    <CartDrawer
      isOpen
      items={cart}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={onIncrement}
    />,
  );

  fireEvent.click(screen.getByTestId("increment"));
  expect(onIncrement).toHaveBeenCalled();
});

test("should show a message indicating that there are not items in the cart", () => {
  render(
    <CartDrawer
      isOpen
      items={[]}
      onClose={jest.fn()}
      onDecrement={jest.fn()}
      onIncrement={jest.fn()}
    />,
  );
  expect(screen.getByText("No hay items en tu carrito")).toBeInTheDocument();
});
