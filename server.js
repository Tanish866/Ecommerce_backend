const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();

const { setServers } = require('node:dns/promises');
setServers(["1.1.1.1", "8.8.8.8"]);

dotenvExpand.expand(myEnv);

const app = require('./app');

const port = process.env.PORT || 6400;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(port, () => {
            console.log('Server running on port', port);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });