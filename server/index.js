//SERVER 
//create an index server. Import your dependencies.
// Create a port for your server.
// Attach variable to an app variable.


//DATABASE
// connect the DB to the server by importing dependencies on the root: massive, dotenv,
// require them on the server index

const express = require ('express'),
        bodyParser= require ('body-parser'),
        cors= require('cors'),
        massive=require('massive');
        require('dotenv').config()  // dotenv will run config which will in turn allow us to use the .env file


        app = express();
        const port = 3008
        app.listen(port,()=>console.log (`listening on port ${port}`));


        

//invoke massive passing in the connection string as a parameter. Because it won't respond immediately it give us a promise or a .then which will take in a call back function. Our goal here is to get a solid connection to the database and return our database (db) as an object, or a databaseInstance (this could be called anything you want).  App.set is a method that allows us to save things to app on our server. It will take in 2 parameters what you want to call it "db"(noun) and the value you want to save and potentially get later -usually data from data base (dbInstance).  
massive(process.env.CONNECTION_STRING).then((dbInstance)=>{
        
        app.set('db', dbInstance)     
        console.log("Connected to Database"); //console.log will tell you in the terminal if you successfully connected.
})    
   




// add middleware bodyParser in order to use .body.
app.use(bodyParser.json())



//Removed fakeDatabase once we connected it to the real one.
// let fakeDatabase={
//     initialProducts:[
//         {
//         id: 0,
//         name: "short ankle booties",
//         color: 'black',
//         price: 150
//         },
//         {
//           id: 1,
//           name: "luxury emu skin boots",
//           color: 'beige',
//           price: 200
//         },
//         { 
//           id: 2,
//           name: 'patent leather heels',
//           color: 'high gloss black',
//           price: 75
//         },{
//           id: 3,
//           name: 'rockstud flip-flops',
//           color: 'blue',
//           price: 45
//         },
//         {
//           id: 4,
//           name: 'tory burch caroline flats',
//           color: 'tan',
//           price: 295
//         },
//     {
//         id: 5,
//         name: 'louis vuitton slides',
//         color: 'navy',
//         price: 700

//     }],

//     productDetails: [
//         {
//             id: 0,
//             name: "short ankle booties",
//             color: 'black',
//             price: 150,
//             details: 'Many facts about the particular shoe'
//             },
//             {
//               id: 1,
//               name: "luxury emu skin boots",
//               color: 'beige',
//               price: 200,
//               details: 'Many facts about the particular shoe'

//             },
//             { 
//               id: 2,
//               name: 'patent leather heels',
//               color: 'high gloss black',
//               price: 75,
//               details: 'Many facts about the particular shoe'
//             },{
//               id: 3,
//               name: 'rockstud flip-flops',
//               color: 'blue',
//               price: 45,
//               details: 'Many facts about the particular shoe'
//             },
//             {
//               id: 4,
//               name: 'tory burch caroline flats',
//               color: 'tan',
//               price: 295,
//               details: 'Many facts about the particular shoe'
//             },
//         {
//             id: 5,
//             name: 'louis vuitton slides',
//             color: 'navy',
//             price: 700,
//             details: 'Many facts about the particular shoe'
//         }
//     ]
// }


//start creating a responsive server by having the server send something back.
//Look into postman to see if the response from server appears in postman after using a get request to the api url.


//endpoint is  when an agent makes a request to the server.
app.get('/api/products', (a_requestFromAgent, responseFromOurServer)=>{
    a_requestFromAgent.app.get('db').getShoes().then((shoes)=>{
        responseFromOurServer.json(shoes);

    })// app.get is a request coming from the agent. The server is saying we have some information stored on app in regard to the agent's request. Get db off of app, and then run whatever sql code we need to capture that data. 
    
})

// What are we doing below: The agent gives us an id (a product which they want details about), this sends the server an ID of the product that they want. We look through all of our products to find the product with the same ID that the user requested. Once we find the product that they want, we sent the details back. 
// req(request object that the agent is sending us).
//params(the URL paramter : anything)
// id (is the specific parameter that the agent is requesting) 

//if our product details at index i is equal to the req.params.id that our agent has clicked on (the product) then return the details of that product. id in +a_requestFromAgent.params.id = id =the id in the url

app.get('/api/products/:id',(a_requestFromAgent,responseFromOurServer)=>{

    // for (var i = 0; i<fakeDatabase.productDetails.length; i++){
    //     if(fakeDatabase.productDetails[i].id===+a_requestFromAgent.params.id){
    //         responseFromOurServer.json(fakeDatabase.productDetails[i])
    //     }
    // }

//parameters can be passed into your sql file by invoking it with an array as the parameter. the response from the server will need to return the index of that object in the array. IT will naturally default to an array (bcs that what you put it into).
    a_requestFromAgent.app.get('db').returnShoeById([a_requestFromAgent.params.id]).then((shoe)=>{
                responseFromOurServer.json(shoe[0])
    })
})


//post = making something new
//put= changing something that exists already
//patch= similar to put


// . body is a json object that allows the user to pass information to the server that the server can then push to the database.

//all ways for the agent to give something to the server.
// .body- gives a json object (used mostly for posts reqs)
// .params- in the URL and are necessary if you have params (:) which provides flexibility to match our url to whatever it is attempting to index
// .query- in the URL but are optional, used for sort options where API can check for queries. ie sort by ascending 

app.post('/api/products',(a_requestFromAgent, responseFromOurServer)=>{
    console.log(a_requestFromAgent.body)
    a_requestFromAgent.app.get('db').insertShoes(
            [a_requestFromAgent.body.name,
            a_requestFromAgent.body.color,
            a_requestFromAgent.body.price, 
            a_requestFromAgent.body.details, 
            ]).then(()=>{console.log('Added Product Successfully'); responseFromOurServer.send('okay!')});
})



app.post('/api/payment', function (req, res, next) {
console.log('yup this is it', req.body)
const amountArray = req.body.amount.toString().split('');
const pennies = [];
for (var i = 0; i < amountArray.length; i++) {
  if (amountArray[i] === ".") {
    if (typeof amountArray[i + 1] === "string") {
      pennies.push(amountArray[i + 1]);
    } else {
      pennies.push("0");
    }
    if (typeof amountArray[i + 2] === "string") {
      pennies.push(amountArray[i + 2]);
    } else {
      pennies.push("0");
    }
    break;
  } else {
    pennies.push(amountArray[i])
  }
}
const convertedAmt = parseInt(pennies.join(''));
const charge = stripe.charges.create({
  amount: convertedAmt, // amount in cents, again
  currency: 'usd',
  source: req.body.token.id,
  description: 'Test charge from react app'
}, function (err, charge) {
  if (err) return res.sendStatus(500)

