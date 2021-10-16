require('dotenv').config()

const axios = require('axios');
const fs = require('fs');

const API_URL = process.env.API_URL_CARBON

//get data using axios
exports.data_get = async (req, res, next) => {
    
    let rawdata = fs.readFileSync('./db/states.json');
    let states = JSON.parse(rawdata);   
    
    let state = req.query.state.toLowerCase().replace("%20", " ");
    
    let year = req.query.year

    let state_key = states.find(st => st.name.toLowerCase() === state);

    state_key = state_key.abbreviation;

    const data = await axios.get(API_URL+state_key+'.A');
    
    const carbonEmission = data.data.series[0].data.find(dt => dt[0] === year)

    res.json(carbonEmission[1]);
    return;
}
