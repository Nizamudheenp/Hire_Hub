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

const companyJobRoutes = require('./routes/company/jobRoutes');
const userJobRoutes = require('./routes/user/jobRoutes');
const applicationRoutes = require('./routes/user/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/company/jobs', companyJobRoutes);
app.use('/api/user/jobs', userJobRoutes);
app.use('/api/user/applications', applicationRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});
