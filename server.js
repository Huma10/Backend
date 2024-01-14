const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const PORT = process.env.PORT || 3000;
// create an instance
const app = express();
// Add JSON Middleware in HTTP Pipeline
app.use(express.json());
// do not parse incoming data other than HTTP Request Message Body
app.use(express.urlencoded({ extended: false }));
// configure CORS
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
}))
// parse the Cookie header on the request
app.use(cookieParser());

require('./dbconnect/db');

require('./routes/user.routes.js')(app);

// listen on PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});   
