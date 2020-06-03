const result = [];
const expectedResult = [];

function subtotal(orders) {
    var subtotal = 0;

    for (var order of orders) {
      var dishes = Array.from(order.dishes);
      for (var dish of dishes) {
        var quantity = dish.quantity;
        var price = dish.price;
        subtotal += quantity * price;
      }
    }
    return subtotal;
}
    
describe("Firebase", () => {
        it("check subtotal return correct result", () => {
            const orders = [];
            const currentOrders = "";
            subtotal(orders, currentOrders);   
            expect(result).toStrictEqual(expectedResult);
        });
    });