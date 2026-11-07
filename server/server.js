"use strict";
require("dotenv").config({path:require("node:path").join(__dirname,".env")});
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const {rateLimit} = require("express-rate-limit");
const {calculateQuote} = require("./pricing");
const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({origin:process.env.FRONTEND_ORIGIN || "http://localhost:5500",methods:["GET","POST"]}));
app.use(express.json({limit:"32kb"}));
app.use("/api",rateLimit({windowMs:60000,limit:30,standardHeaders:"draft-7",legacyHeaders:false}));
app.get("/api/health",(req,res) => res.json({ok:true,mode:"quote-preview",livePaymentEnabled:false}));
app.post("/api/quote",function(req,res,next) {
  try { res.json(calculateQuote(req.body)); } catch(error) { next(error); }
});
app.post("/api/create-order",(req,res) => res.status(503).json({error:"Payments are disabled. This version supports demo quotes only."}));
app.post("/api/verify-payment",(req,res) => res.status(503).json({success:false,error:"Payment verification is not configured."}));
app.use(function(error,req,res,next) {
  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({error:status >= 500 ? "Checkout service error." : error.message});
});
const port = Number(process.env.PORT || 3000);
app.listen(port,() => console.log("CGR quote API listening on port " + port));
