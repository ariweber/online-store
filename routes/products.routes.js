import express from "express";
import {readFrmJson} from "../storage/fileDB.js"


const router = express.Router();


router.get("/", async (req, res)=>{
    const products =  await readFrmJson("products")
    console.log(products); 
    res.json({data: products})
})

export default router;
