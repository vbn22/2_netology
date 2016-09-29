"use strict"

class Customer{
    constructor(data, movies){
        this._data = data;
        this._movies = movies;
    }
    get name() {return this._data.name;}
    get rentals() {return this._data.rentals.map(r => new Rental(r, movies));}
}

class Rental{
    constructor(data, movies){
        this._data = data;
        this._movies = movies;
    }
    get days() {return this._data.days;}
    get movieID() {return this._data.movieID;}
    get movie() {
        return this._movies[this.movieID]
    }
}

function statement(customerData, movies) {
    const customer = new Customer(customerData, movies);

    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${rental.movie.title}\t${getAmount(rental)}\n`;
    }

    result += `Amount owed is ${getTotalAmount(customer)}\n`;
    result += `You earned ${getTotalFrequentRentalPoints(customer)} frequent renter points\n`;
    return result;

    function getAmount(rental) {
        let movie = rental.movie;
        let thisAmount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

    function getFrequentRentalPoints(rental){
        return (rental.movie.code === "new" && rental.days > 2) ? 2 : 1;
    }

    function getTotalFrequentRentalPoints(customer){
        let totalFrequentRentalPoints = 0;
        for (let rental of customer.rentals) {
            totalFrequentRentalPoints += getFrequentRentalPoints(rental);
        }
        return totalFrequentRentalPoints;
    }

    function getTotalAmount(customer){
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getAmount(rental);
        }
        return totalAmount;
    }
}


let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
}

let movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
}

console.log(statement(customer, movies))