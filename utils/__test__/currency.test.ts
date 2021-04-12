import { parseCurrency } from "../currency";

describe("currency", () => {
  describe("parseCurrency", () => {
    it("should return the price to local", () => {
      const actual = 65;
      const expected = `$\xa065,00`;

      expect(parseCurrency(actual)).toEqual(expected);
    });
  });
});
