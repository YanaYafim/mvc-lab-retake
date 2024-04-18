const cars = [
    { id: 1, make: "Toyota", model: "Yaris", year: 2001, color: "white" },
    { id: 2, make: "Honda", model: "Bird", year: 2009, color: "blue" },
    { id: 3, make: "Ford", model: "First", year: 2015, color: "red" },
    { id: 4, make: "BMW", model: "Winner", year: 2021, color: "black" },
    { id: 5, make: "Toyota", model: "Golf", year: 2019, color: "blue" }
];

const getCars = () => {
    return cars;
}

const getCarInformation = (id) => {
const car = getCars().find(car => car.id === id);
    if (car) {
        return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`;
    } else {
        return "Car doesn't exist";
    }
}

const getCarAge = (id) => {
const car = getCars().find(car => car.id === id);
    if (car) {
        const currentYear = new Date().getFullYear();
        const carAge = currentYear - car.year;
        return `Car is ${carAge} years old.`;
    } else {
        return "Car doesn't exist";
    }
}

module.exports = {
    getCars,
    getCarInformation,
    getCarAge
};