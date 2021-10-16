require('dotenv').config()

const axios = require('axios');
const fs = require('fs');

const API_URL = process.env.API_URL_CARBON

//get data using axios
exports.data_get = async (req, res, next) => {
    
    let rawdata = fs.readFileSync('./db/states.json');
    let states = JSON.parse(rawdata);   
    
    let state = req.query.state.toLowerCase().replace("%20", " ");
    
    let yearFrom = req.query.from

    let yearTo = req.query.to

    let state_key = states.find(st => st.name.toLowerCase() === state);

    state_key = state_key.abbreviation;

    const data = await axios.get(API_URL+state_key+'.A');
    
    let fromIndex = data.data.series[0].data.findIndex(dt => dt[0] === yearFrom)

    let carbonSum = 0;

    for(var i=0; i<=yearTo-yearFrom; i++) {
        carbonSum += (Math.round((data.data.series[0].data[fromIndex][1])*10))/10;
        fromIndex--;
    }
    
    res.json(carbonSum.toFixed(1));
    return;
}
