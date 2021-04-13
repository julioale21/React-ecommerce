import { editCart } from "../selectors";
import { Product } from "../types";
import { CartItem } from "./../types";
describe("editCart", () => {
  const product: Product = {
    id: "id",
    category: "category",
    description: "description",
    image: "image",
    price: 100,
    title: "title",
  };

  it("should reduce the quantity of a product on one", () => {
    const actual: CartItem[] = [{ ...product, quantity: 5 }];
    const expected: CartItem[] = [{ ...product, quantity: 4 }];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });

  it("should increment the quantity of a product on one", () => {
    const actual: CartItem[] = [{ ...product, quantity: 5 }];
    const expected: CartItem[] = [{ ...product, quantity: 6 }];

    expect(editCart(product, "increment")(actual)).toEqual(expected);
  });

  it("should remove a product if the quantity is one and the action is decrement", () => {
    const actual: CartItem[] = [{ ...product, quantity: 1 }];
    const expected: CartItem[] = [];

    expect(editCart(product, "decrement")(actual)).toEqual(expected);
  });
});
