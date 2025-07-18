const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();
const cors = require('cors');

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

const authRoute = require('./routes/authRoutes');

app.use('/api/auth', authRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});
