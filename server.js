const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());


var corsOptions = {
    //origin: "http://localhost:4200"
    origin: "*"
  };

app.use(cors(corsOptions));

// mettre le serveur à l'écoute(en marche) sur le port 85
app.listen(
    86,
    ()=>{console.log("Serveur Express a l ecoute sur le port 85");}
);

// connexion de notre serveur à la base mongo
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'gestibank';


let db 


MongoClient.connect(url, function(err, client) {
 console.log("Connexion réussi avec Mongo");
 db = client.db(dbName);
});


//******************* */  Les API Rest des Clients //******************* */

// get user with role = agent
app.get('/users/list/agent', (req,res) => {
      db.collection('users').find({"role": "agent"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })
    
    // inscription d'un nouveau agent
app.post('/add/agent',  async (req,res) =>
 {
      
       try {
              const newClient = req.body
              const addedClient = await db.collection('users').insertOne(newClient)
              res.status(200).json(addedClient)
          } catch (err) {
              console.log(err)
              throw err
          } 
    })
    
    app.post('/add',  async (req,res) =>
 {
      
       try {
              const newClient = req.body
              const addedClient = await db.collection('users').insertOne(newClient)
              res.status(200).json(addedClient)
          } catch (err) {
              console.log(err)
              throw err
          } 
    })
// Tous les clients avec status en attente
app.get('/clients/list/attente', (req,res) => {
          db.collection('users').find({"role": "CLIENT","statut":"ATTENTE"}).toArray(function(err, docs) {
              if (err) {
                  console.log(err)
                  throw err
              }
              res.status(200).json(docs)
            }) 
})

// Tous les clients avec status validé
app.get('/clients/list/valide', (req,res) => {
      db.collection('users').find({"role": "CLIENT","statut":"VALIDE"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
})

// Tous les clients avec status validé
app.get('/agent/list', (req,res) => {
      db.collection('users').find({"role": "AGENT"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
})


    app.get('/users/:email', async (req,res) => {
        const email =req.params.email
        try {
            const docs = await db.collection('users').findOne({email})
            res.status(200).json(docs)
        } catch (err) {
            console.log(err)
            throw err
        }
      })


//******************* */  Les API Rest des Agents //******************* */

// Tous les agents
app.get('/agents/list/', (req,res) => {
      db.collection('users').find({"role": "AGENT"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })

// Ajout d'un nouvel agent par l'admin
app.post('/agents/add/', async (req,res) => {
      try {
              const newAgent = req.body
              const addedAgent = await db.collection('users').insertOne(newAgent)
              res.status(200).json(addedAgent)
          } catch (err) {
              console.log(err)
              throw err
          } 
    })


//******************* */  Les API Rest des Admin//******************* */

// Tous les agents
app.get('/admin/list/', (req,res) => {
      db.collection('users').find({"role": "ADMIN"}).toArray(function(err, docs) {
          if (err) {
              console.log(err)
              throw err
          }
          res.status(200).json(docs)
        }) 
    })

    // code de mise à jour d'un client ( assign to agent )
app.put('/users/:email',(req,res)=>{
    const email =req.params.email

    const Users = equipes.find( element => {return element.email === email}); // on cherche l'équipe qui a le même id que num
    Users.agent = req.body.agent;

    res.status(200).json(team);

});