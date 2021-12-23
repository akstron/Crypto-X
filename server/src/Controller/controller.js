const fetchHistory = require("../utils/fetchHistory");
const fetchMarketChartRange = require("../utils/fetchMarketChartRange");

exports.fetchHistory = (req, res) => {
    if(!req.query.date || !req.query.coin){
      return res.send({
        error: 'Please provide correct data'
      })
    }
    
    fetchHistory(req.query.date, req.query.coin, (error, response)=> {
      if(error){
        return error;
      }
      res.send({
        response: response
      })
    });
  }

exports.fetchMarketchartRange = (req, res) => {
    if(!req.query.from || !req.query.to || !req.query.coin){
      return res.send({
        error: 'Please provide corredt data'
      })
    }
    console.log(req.query.coin);
    fetchMarketChartRange(req.query.from, req.query.to, req.query.coin, (error, response)=> {
      if(error){
        return error;
      }
      res.send({
        response: response
      })
    });
  }

  