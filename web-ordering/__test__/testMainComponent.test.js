// getMenu = (restaurantName) => {
//   const menuRef = restaurantName + "Menu";
//   if (restaurantName != null) {
//       database.collection(menuRef).get().then(snapshot => {
//           const menu = snapshot.docs.map(doc => doc.data());
//           // console.log("ready to dispatch menu: " + JSON.stringify(menu)); // array of food
//           this.setState({ menu: menu });
//       })
//           .catch((err) => {
//               console.log('Error fetching menu', err);
//           });
//   }
// };

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    const val1 = 2;
    const val2 = 2;
    const result = val1 + val2;
    const expectedResult = 4;
    expect(result).toBe(expectedResult);
  });
});