


  describe("Addition", () => {
    it("knows that 2 and 2 make 4", () => {
      var price = [195, 196, 197, 198, 199, 200, 201];
      var number = [1, 1, 2, 1, 2, 1, 1];
      expect(updatepc(price,number)).toBe(1782);
    });
  });

  describe("Addition", () => {
    it("knows that 2 and 2 make 4", () => {
      var kg = ({
        name: "g",
        price: 120,
        number: 1,
        subtotal: 120,
        taxrate: 0.05,
        finished: false,
      });
      expect(handleOrder(kg,120)).toStrictEqual({"finished": false, "name": "g", "price": 120, "quantity": 1, "subtotal": 120, "taxrate": 0.05});
    });
  });


  const updatepc = (price,number) => {
    
    var overallPrice = 0;
    for (var i=0;i<price.length;i++) {  
      overallPrice += price[i] * number[i];
    }
     return overallPrice;
  }


  const handleOrder = (doc,totalPrice) => {
      var k = ({
        name: doc.name,
        price: doc.price,
        quantity: doc.number,
        subtotal: totalPrice,
        taxrate: 0.05,
        finished: false,
      });
      console.log(k);
      return k;
  };


