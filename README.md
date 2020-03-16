# Casumo 1 milion books app

## How I did it

* The primary interest was to sort and render on client side
* Preparing your full library at the beginning
* Using Suspense and Lazy loading for the initial loading while the faker helps me create 1 million books
* The ag-grid configuration does the rest
* There are custom buttons for sorting and filtering

### Used libraries

* [React] - No Explanation needed
* [faker] - doing the imagination for books and author data
* [ag-grid] - doing the magic with rendering on the client side ( virtual repeater, infinite scroll, sorting, filtering ...)

### Install
Download or clone the repository:

    git clone https://github.com/nevengjoreski/casumo

Go to directory

    cd casumo
    
Install libraries:

    npm install
    
Lanching the development application:

    npm start 
    
Building the production application:

    npm run build
    
Lanching the production application:

    serve -s build
    
Running the test

    npm test