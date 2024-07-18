# Airbnb clone app
This project is a MERN stack Airbnb clone application built using Vite. The API folder consists of the backend code and the client folder consists of the front-end code. 

## Overview
* User registration form
* User login form
* User authentication using JSON web token(JWT).
* Registration of places for rentals
* All available listings
* Photo gallery of the rental place
* A booking widget to perform booking

## Project implementation
The major elements of this project include:
1. The styling of this application is done using Tailwind CSS.
2. Users are required to provide email, name and password to register on the application.
3. All the available places are visible to users whether or not they are logged in, but to perform the user is redirected to login page if not logged in.
4. The JSON web token that is stored on the client side is used to authenticate the user to perform actions such as registering a place or performing booking. Once the JWT authentication is done the user can proceed with using the application.
5. Database was built using Mongo DB cloud. Three database models were built each for places, users, bookings.
6. Libraries used:
   * axios for handling api requests
   * bcrypt for encrypting data like passwords to store in the database
   * multer for uploading images
   * image-downloader to download images and store them in the uploads folder to display them on the website.
   * And standard react hooks imports such as useState to preserve state of the input and communicate it to the backend, useEffect for synchronization  etc.,

### User-registration page:
  ![alt text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/RegisterPage.png)
  
### Login page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/LoginPage.png)
  
### Home page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/HomePage.png)

### Add places page or registering a place page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/AddPlacesPage.png)

### Edit an existing place page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/AddPlacesPage.png)

### Photo gallery page for a place:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/PictureGalley.png)

### Listings registered by the current user:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/MyListingsPage.png)

### Making a booking page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/MakingABooking.png)

### Bookings made by the current user page:
  ![alt-text](https://github.com/R0h1thKambampat1/Airbnb-clone-using-MERN-stack/blob/main/test/MakingABooking.png)

## Running it in local system:
Vite  client side default runs on port 5173 and the the backend runs on port 4000.
#### Commnds to run the project:
* After downloading the project cd to the project and client and run "yarn dev"
* On a different terminal switch to api directory and run "node index.js" or "nodemon index.js"


