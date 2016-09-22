"use strict"

function getFrequentRentalPoints(rental,movies){
        return (movieFor(rental,movies).code === "new" && rental.days > 2) ? 2:1;
    }

function movieFor(rental,movies) {
        return movies[rental.movieID];
    }

function getAmount(rental,movies) {
        let movie = movieFor(rental,movies);
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

function getTotalAmount(customer,movies){
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getAmount(rental,movies);
        }
        return totalAmount;
    }

function getTotalFrequentRentalPoints(customer,movies){
        let totalFrequentRentalPoints = 0;
        for (let rental of customer.rentals) {
            totalFrequentRentalPoints += getFrequentRentalPoints(rental,movies);
        }
        return totalFrequentRentalPoints;
    }

function statement(customer, movies) {
    let result = `Rental Record for ${customer.name}\n`;
    for (let rental of customer.rentals) {
        result += `\t${movieFor(rental,movies).title}\t${getAmount(rental,movies)}\n`;
    }
    
    // add footer lines
    result += `Amount owed is ${getTotalAmount(customer,movies)}\n`;
    result += `You earned ${getTotalFrequentRentalPoints(customer,movies)} frequent renter points\n`;
    return result;
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