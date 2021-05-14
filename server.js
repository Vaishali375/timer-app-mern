require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Histories = require("./dbHistory")

const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


//Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB');
});

app.get("/", (req, res) =>{
    res.json({msg:"hello"});
});

app.get("/history/sync", (req, res) => {
    Histories.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.post("/history/new", (req, res) => {
    const dbHistory = req.body;


    Histories.create(dbHistory, (err, data) => {

    if(err){
        res.status(500).send(err);
    }else{
        res.status(201).send(data);
    }
});
});




const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});