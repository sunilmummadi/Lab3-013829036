const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const config = require("./config");

app.use(cors({ origin: config.frontEndURI, credentials: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Mongo Connection
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Could not connect to MongoDB", err);
    }
};

connectDB();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(8080, () => {
    console.log("GraphQL server started on port 8080");
})