require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT

// adding middleware
app.use(express.json())
app.use(cors())

const characters=require("./harrypotter.json")


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/characters', (req,res)=>{
    res.send(characters)
})

app.get('/characters/:id', (req,res)=>{
    const id = req.params.id;
    const character = characters.find((character)=>character.id==id)
    if(character==undefined){
        res.status(404).send("The character does not exist")
    }else{
        res.send(character);
    }
})

const ids=characters.map((character)=>(character.id))
let maxId=Math.max(...ids);
app.post("/characters", (req,res)=>{
    const character = characters.find((character)=>character.name.toLowerCase()==req.body.name.toLowerCase())
    if(character!=undefined){
        res.status(409).send("The character already exists");
    }else{
        maxId+=1;
        req.body.id=maxId;
        characters.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase();
    const characterIndex=characters.findIndex((character)=>character.name.toLowerCase()==name)
    if(characters==-1){
        res.status(404).send("The character does not exist");
    }else{
        characters.splice(characterIndex,1);
        res.sendStatus(204);
    }
})

// this is used to make a partial update to an exisiting resource
app.patch("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase();
    const character=characters.find((character)=>character.name.toLowerCase()==name)
    const newCharacterName = req.body.name
    if(characters == undefined){
        res.status(404).send("The character does not exist");
    }else{
        character.name = newCharacterName
        res.status(200).send(character)
    }
}
)

// app.patch("/characters/:id", (req, res) => {
//     let character = characters.find((character) => character.id == req.params.id);
//     if (!character) return res.sendStatus(404);
//     character = {
//       ...character,
//       ...req.body,
//     };
//     res.send(character);
//   });

app.listen(port, ()=>{
    console.log(`The app is listening on port ${port}`);
})




// npm run dev 
// splice fcn