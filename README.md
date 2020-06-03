# In-Dining-QR-Code-Ordering-System
Our System provides a web application accessed by restaurants customers scanning the code on the table where they can check the menu and order
AND
a mobile application for restaurant owners to see the status and orders of each table and customize on their menu at any time

## Restaurant Mobile App

go to "QR-Dining-MobileApp" folder. Run

	npm install
for downloading all the dependencies, then Run

	npm start
to run the expo mobile app.

First create an account, Note **restaurant name** is the unique identifier for the customers to access your menu so that cannot change later, please be cautious for entering.
Then login to use the app.

	On the table Page, you can add your tables and see or control the orders and status of each table by normal press and long press.
The color on each table means different status of the table
* Green: this table do not need your interfere(still browsing menu or no one using the system on this table)
* Yellow: this table has already ordered and need the restaurant to make and serve the food.
* Orange: all dishes for this table have been served, need them to pay after finish.
* Red: this table need some help

![Table Page](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/table%20page.png?alt=media&token=3c3195de-5dfa-4f09-87ba-f858c4da3645)



	
	On the order page, you can see all orders made from all the tables which either finished or still processing

![Orders](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/Orders.png?alt=media&token=6d576bab-13bd-4a78-8a75-75a9649c09d6)

	On the  Menu page, you can edit the dish information and categories you want to have.

![Menu Page](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/menu%20page.png?alt=media&token=1badacbf-fd41-45a2-9bc9-c8ec14effd83)


##  Web-ordering

Since we have already host our website using fire base hosting:
https://qr-code-ordering-system.firebaseapp.com/[restaurant_name]/[table_ID]
First replace [] with your restaurant name and table name, then copy the link to [QR Code Generator](https://www.qr-code-generator.com) to create a QR code relevant to this table and scan it.
 

	The default display is promote page which show two of the latest promoted dishes.
![Promotions](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/Promotions.png?alt=media&token=550a9020-7f30-435e-8fd3-47a2eebc9fb2)

	Then customers can use the Top app bar to navigate to different pages or ask for help from restaurants.
![enter image description here](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/AppBar.png?alt=media&token=6cadbf75-8118-4b6d-b6ab-2992ce85c932)


	This is the menu pages use to browse dishes by categories or search key words
![enter image description here](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/menu.png?alt=media&token=c30772a8-eb3a-478c-9996-c442b241aabb)

	You can check and edit what you and your friends in the same tables have already ordered in the cart page
![enter image description here](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/Cart.png?alt=media&token=cbef1d78-b196-4bc7-84a3-be8e69740c32)

	After you placing the order, you can go to Order History page to double check it or continue order more dishes.
![enter image description here](https://firebasestorage.googleapis.com/v0/b/qr-code-ordering-system.appspot.com/o/OrderHistory.png?alt=media&token=9f48a7bc-061d-4eef-b0f8-e828b4356d0e)


**Tips: All data is shared within each table, you can use multiple devices to scan on same QR code to order together;**




