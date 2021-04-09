const express = require("express");
const app = express();
const fetch = require("node-fetch");

  app.use(express.static('public'));
  app.set("view engine","ejs");

  var data;

  const getData = async(getip)=>{
    await fetch("https://geo.ipify.org/api/v1?apiKey=at_UxFRkmX62TqZNFxL3xakCNUumBIf7&ipAddress="+getip)
    .then((res)=>{return res.json();})
    .then((resData)=>{data=resData})
    .catch((err)=>{console.log(err)})
    
  }

  app.get("/",(req, res)=>{
      res.render("index", {
          ip: "",
          location:"",
          timezone:"",
          isp:"",
          lat: "",
          lng:"",
          validation:false,
          getIp:true
      });  

  });


  app.get("/:ip",(req, res)=>{  
    getData(req.params.ip).then(()=>{
      if(!data.ip){
        res.render("index", { 
          ip: "",
          location:"",
          timezone:"",
          isp:"",
          lat: "",
          lng:"",
          validation:true,
          getIp:true
        });

      }else{
        res.render("index", { 
          ip: data.ip,
          location:data.location.city,
          timezone:data.location.timezone,
          isp:data.isp,
          lat: data.location.lat,
          lng:data.location.lng,
          validation:false,
          getIp:false
        });
      }
      
    })
  });






app.listen(process.env.PORT||3000, () => {
  console.log("listen 3000");
});

