import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "paraabir"
})


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended :true}))

app.get("/",(req, res)=>{
    res.json("hello Expres")
})
app.post("/produits",(req, res)=>{
    const q = "INSERT INTO `produits`(`id`, `name`, `description`, `src`) VALUES (?)"
    const values = [null,"from backend","from backend","from.jpg"]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get("/produits",(req, res)=>{
    const q = "SELECT * FROM produits"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.listen(8800, ()=>{
    console.log("server in port 5000")
})