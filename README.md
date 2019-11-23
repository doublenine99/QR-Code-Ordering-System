# In-Dining-QR-Code-Ordering-System

## Environment Setting

Clone the whole repo, and go to "web-ordering" folder and "QR-Dining-MobileApp" folder. Run "npm install" in each folder to install all dependencies. 

## Web-ordering

Since we have already host our website using fire base hosting,https://qr-code-ordering-system.firebaseapp.com/[restaurant_name]/[table_ID]/ there are two ways of running the ordering pages
1. Scan the QR codes in the repo directly, go to the page about corresponding table.
2. use "npm start" run on local server, it will pop the webpage with the address (http://localhost:3000/[restaurant_name]/[table_ID]/promotions)
you should manually type the [restaurant_name] and [table_ID] (e.g. (http://localhost:3000/koisushi/table0/promotions), right now we only have the database for koisushi restaurant, but you can type any [table_ID] exist or created from the mobile app.

The default display is promote page which show two of the latest promoted dishes.

If you want to add the food to the cart directly in promotion page, you can just directly press the add button.
You can navigate to other categories by press the sidebar activator go to menu page filtered by category .
Or you can type some text to search the dish by their name.

Click on the image of one dish in menu page will guide you to the detail page introduce the dish.

You can check what you and your friends have already added by pressing the shopping cart icon.
In here, you can still add or delete the number of dishes you want to eat.

Then, you can press either confirm/clear button to make order or keep looking for other menu.
After you successfully do order, then you can check your order history by pressing following icon: 
While you are waiting for the order or need some extra help, you can press the following icon to ask for help. After pressing it, it will show the following message “Message sent, please wait for someone comes to help you”.

**Tips: All data is shared within each table, you can use multiple devices to scan on same QR code to order together;**

## Restaurant Mobile App

1. ‘npm start’ respectively.  
2. A web page will open in browser. Scan the QR code with smartphone’s camera to access the app.
3. create an account first, right now no matter which account you are, we will give you the control of Koisushi restaurant.
4. On the table Page, you can see or control the status of table by long press,  check the order of each table by normal press.

                          the color of each table means different things. 
* Green: this table do not need your interfere(still browsing menu or no one using the system)
* Yellow: this table has already ordered and need the restaurant to make and serve the food.
* Orange: all dishes for this table have been served, need them to pay after finish.
* Red: this table need some help
5. On the order page, you can see all orders finished or still processing
6.  On the profile page, you can change your profile information or go to Menu page
7. On the  Menu page, you can edit the dish information and categories you want to have.


