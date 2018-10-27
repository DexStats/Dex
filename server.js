const express = require('express');
const app  = express();
const port = process.env.PORT || 3000;
//webscrape tools
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


//basic express server
app.use(express.static(__dirname + '/'))

app.listen(port, () => console.log(`server running on ${port}`))

//webscrape logic
var url = 'https://etherscan.io/stat/dextracker?range=1';
var holderArr = [];
var finalDataArr = [];

request(url, function(error, response, body) {
  if (!error) {
    let $ = cheerio.load(body);
    $('tbody > tr').each(function(i, element){
      let a = $(this);
      holderArr.push([a.html()])
    });
    holderArr = holderArr.slice(0,20);
    var arr = holderArr.map(row => {
      return row[0].split('</td>')
    })
    var splitArr = arr.map(row => {
      return row.map(inner => {
        return inner.replace('<td>', '')
      })
    })
    for (let i = 0; i < splitArr.length; i++) {
      var str = splitArr[i][1];
      var first = str.split('</noscript>')
      splitArr[i][1] = first[1].trim().slice(0, first.length-6);
    }
    for (let i = 0; i < splitArr.length; i++) {
      finalDataArr.push({Number: splitArr[i][0], Name: splitArr[i][1], 'Total Transactions': Number(splitArr[i][2])})
    }
    // console.log('arr', finalDataArr)
  }
  else {
    console.log('there was an error', error)
  }
  fs.writeFile('transactions.json', JSON.stringify(finalDataArr,null, 4), function(err){
    console.log('json file written')
  })
})
