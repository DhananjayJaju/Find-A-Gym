const mongoose = require('mongoose');
const cities = require('./cities');
const {first,second} = require('./seedHelpers');
const Gym = require('../models/gym');
const price1 = Math.floor(Math.random()*5000);

mongoose.connect('mongodb://localhost:27017/find-a-gym',{});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() =>{
    await Gym.deleteMany({});
    for(let i=0;i<400;i=i+1){
        const random406 = Math.floor(Math.random()*406);
        const gym1 = new Gym({
            author: '61fa3a273818d5970ab9a78f',
            images: [
                { 
                    url : "https://res.cloudinary.com/dhananjayjaju/image/upload/v1643822722/FindAGym/c0ga4pr6bcl3pqxzu8bn.jpg", 
                    filename : "FindAGym/c0ga4pr6bcl3pqxzu8bn"
                },
                { 
                    url : "https://res.cloudinary.com/dhananjayjaju/image/upload/v1643822723/FindAGym/lgvsvnm42kfuagah39fe.jpg",
                    filename : "FindAGym/lgvsvnm42kfuagah39fe"
                }
            ],
            location: `${cities[random406].city}, ${cities[random406].admin_name}`,
            geometry: 
            { 
                type: "Point",
                coordinates: [ 
                    cities[random406].lng, 
                    cities[random406].lat 
                ] 
            },
            title: `${sample(first)} ${sample(second)}`,
            price: price1,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio libero dolor officia voluptas quas placeat quibusdam quos nisi! Ratione nobis at magni possimus rerum facilis nulla magnam totam aliquam quibusdam!'
        })
        await gym1.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});