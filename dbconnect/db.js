const mongoose = require('mongoose');

const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qo2xnk9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('connection successful');
}).catch((e) => {
        console.log(e);
});
    