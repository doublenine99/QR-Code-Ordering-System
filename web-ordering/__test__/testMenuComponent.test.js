const result = [];
const expectedResult = [];

function filterMenuByCategory(menu, currentCategory) {
    currentCategory = String(currentCategory);
    var MenuAfterfiltered = [];
    var menu = Array.from(menu).filter(dish => dish.availability === true);
    var k = String(currentCategory).charAt(0);
    console.log(k);

    if (currentCategory.charAt(0) != "#") {
        for (var dish of menu) {
            for (var category of Array.from(dish.categories)) {
                if (String(category).toLowerCase() == String(currentCategory).toLowerCase()) {
                    MenuAfterfiltered.push(dish)
                    break;
                }
            }
        }
    } else {
        // result.push();
        var w = String(currentCategory).substring(1);
        // console.log(JSON.stringify(w));
        for (var dish of menu) {
            var pos = String(dish.name).toLowerCase().search(String(w).toLowerCase());
            if (pos !== -1) {
                MenuAfterfiltered.push(dish)
            }
        };
        // setAddAlert(false);
    }
    // expect.push();
    // console.log(MenuAfterfiltered);
    return MenuAfterfiltered;
}


describe("Firebase", () => {
    it("check getMenu return correct result from firebase", () => {
        const menu = [];
        const currentCategory = "";
        filterMenuByCategory(menu, currentCategory);

        expect(result).toStrictEqual(expectedResult);
    });
});