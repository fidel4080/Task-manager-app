const express = require('express');
const app = express();
const tasks = require('./routes/tasks.routes.js')
const connectDB = require('./DB/connect.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 3000;
app.use(express.json());
app.use(express.static('./Public'));

app.use('/api/v1/tasks', tasks);

const startServer = async ()=>{

    try {
        await connectDB();

        app.listen(PORT, ()=> {
            console.log(`Server listening on port: ${PORT}`);
        });

    } catch (error) {
        console.log("Start server error:", `${error.message}`);
    }
}

startServer();


