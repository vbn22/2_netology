"use strict"

class Customer{
    constructor(data, movies){
        this._data = data;
        this._movies = movies;
    }
    get name() {return this._data.name;}
    get rentals() {return this._data.rentals.map(r => new Rental(r, movies));}
    get getTotalAmount() {
        let totalAmount = 0;
        for (let rental of this.rentals) {
            totalAmount += rental.amount;
        }
        return totalAmount;
    }
    get getTotalFrequentRentalPoints() {
        let totalFrequentRentalPoints = 0;
        for (let rental of this.rentals) {
            totalFrequentRentalPoints += rental.getFrequentRentalPoints;
        }
        return totalFrequentRentalPoints;
    }
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
    get getFrequentRentalPoints() {
        return (this.movie.code === "new" && this.days > 2) ? 2 : 1;
    }
    get amount() {
        let movie = this.movie;
        let thisAmount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (this.days > 2) {
                    thisAmount += (this.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = this.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (this.days > 3) {
                    thisAmount += (this.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }
}

function statement(customerData, movies) {
    const customer = new Customer(customerData, movies);

    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${rental.movie.title}\t${rental.amount}\n`;
    }

    result += `Amount owed is ${customer.getTotalAmount}\n`;
    result += `You earned ${getTotalFrequentRentalPoints(customer)} frequent renter points\n`;
    return result;

    function getTotalFrequentRentalPoints(customer){

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