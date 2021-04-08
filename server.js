const express = require("express");
const app = express();
const https = require('https');
const fetch = require("node-fetch");

  app.use(express.static('public'));
  app.set("view engine","ejs");

  var ip;
  var data;
  var defaultData;

  const getData = async(getip)=>{
    if(!getip){
      await fetch("https://api.ipify.org?format=json")
      .then((res)=>{return res.json();})
      .then((data)=>{ip=data.ip.toString();})
      .catch((err)=>{console.log(err)})
    }else{
      ip = getip;
    }

    await fetch("https://geo.ipify.org/api/v1?apiKey=at_UxFRkmX62TqZNFxL3xakCNUumBIf7&ipAddress="+ip)
    .then((res)=>{return res.json();})
    .then((resData)=>{data=resData})
    .catch((err)=>{console.log(err)})
    
  }




    

  app.get("/",(req, res)=>{
    getData().then(()=>{
      defaultData = data;
      res.render("index", {
          ip: ip,
          location:data.location.city,
          timezone:data.location.timezone,
          isp:data.isp,
          lat: data.location.lat,
          lng:data.location.lng,
          validation:false
      });  
    })
    
  });


  app.get("/:ip",(req, res)=>{  
    getData(req.params.ip).then(()=>{
      if(!data.ip){
        res.render("index", { 
          ip: defaultData.ip,
          location:defaultData.location.city,
          timezone:defaultData.location.timezone,
          isp:defaultData.isp,
          lat: defaultData.location.lat,
          lng:defaultData.location.lng,
          validation:true
        });

      }else{
        res.render("index", { 
          ip: ip,
          location:data.location.city,
          timezone:data.location.timezone,
          isp:data.isp,
          lat: data.location.lat,
          lng:data.location.lng,
          validation:false
        });
      }
      
    })
  });






app.listen(process.env.PORT||3000, () => {
  console.log("listen 3000");
});

