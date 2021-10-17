const Emissions = require('../models/Emissions')

require('dotenv').config()

const fs = require('fs');

exports.data_get = async (req, res, next) => {
    
    let yearFrom = parseInt(req.query.from)

    let yearTo = parseInt(req.query.to)

    const data = await Emissions.find({});
    
    const highestState = {
        state: "",
        sum: 0,
    }

    for(var i=0; i < data.length; i++) {

        state = data[i].state;

        let fromIndex = data[i].emissions.findIndex(dt => dt.year === yearFrom)

        let carbonSum = 0;

        for(var y=0; y<=yearTo-yearFrom; y++) {
            carbonSum += data[i].emissions[fromIndex].amount;
            fromIndex--;
        }

        if(carbonSum > highestState.sum) {
            highestState.state = state;
            highestState.sum = carbonSum
        }
    }
    
    res.json(highestState);
    return;
}

//add sample data
exports.data_post = (req, res, next) => {
    
    try {
    let state = "Delaware"

    let rawdata = fs.readFileSync('./db/sample.json');
    let emissions = JSON.parse(rawdata); 

    let object = {
        state: state,
        emissions: [{
            year: parseInt(emissions[0][0]),
            amount: parseFloat(emissions[0][1]),
        }]
    }

    console.log(emissions);

    for(var i=1; i <emissions.length; i++) {
        
        let ob = {
            year: parseInt(emissions[i][0]),
            amount: parseFloat(emissions[i][1])
        }
        
        object.emissions.push(ob);
    }

    var newEmissions = new Emissions(object);
    
    newEmissions.save((err) => {
        if(!err) {
            console.log("mongo success");
            }

        else {
            console.log(err.message)
            }
    })
    
    res.json("succefully saved"); }
    catch(err) {
        console.log(err);
    }
}
