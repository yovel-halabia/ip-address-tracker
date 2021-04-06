const express = require("express");
const app = express();
const https = require('https');

  app.use(express.static('public'));

  var ip;
  var data;


  //get ip
  const getIP = new Promise((resolve, reject) =>{
      https.get("https://api.ipify.org?format=json",(res)=>{
      res.on('data', (d) => {
        ip = JSON.parse(d).ip.toString();
        resolve();
      });

      res.on('error',()=>{
        reject();
      })
    });
  });

  //get the location after getting the ip
  getIP.then(()=>{
    console.log(ip);
    https.get("https://geo.ipify.org/api/v1?apiKey=at_UxFRkmX62TqZNFxL3xakCNUumBIf7&ipAddress="+ip,(res)=>{
      res.on('data', (d) => {
        data= JSON.parse(d);
      });
    });
  }).catch(()=>{console.log("err");});



    

  app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html");
  })




app.listen(3000, () => {
  console.log("listen 3000");
});

