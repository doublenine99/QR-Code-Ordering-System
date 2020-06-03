function filterMenuByCategory(menu) {
    var MenuAfterfiltered = [];
    menu = Array.from(menu);
  
    for (var dish of menu) {
      for (var category of Array.from(dish.categories)) {
        if (String(category).toLowerCase() === "prompt") {
          MenuAfterfiltered.push(dish);
          break;
        }
      }
    }
    // console.log(MenuAfterfiltered);
    return MenuAfterfiltered;
  };

  const menuList = [
    'availability',
    'categories',
    'description',
    'id',
    'image',
    'name',
    'new price',
    'price',
  ];

test('there is "categories" in menu', () => {
    expect(menuList).toContain('categories');
});
const categoriesList = [
    'all',
    'prompt',
    'roast',
    'drink',
  ];

test('there is "prompt" in menu', () => {
    expect(categoriesList).toContain('prompt');
});

