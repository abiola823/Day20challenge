const mongoose  = require('mongoose');
const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if(mongoose.connection.readyState === 1){
            console.log('Database connected successfully')
        }else{
            console.log('Unable to establish connection to the database')
        }
    } catch (error) {
        console.log('Error connecting to database:', error);
    }
}

module.exports = db;