const app = require('./app');
const { connect , cleanup , disconnect } = require('./database');

const port = process.env.PORT || 8080

connect();


app.listen(port,()=>{
    console.log(`app is run in port ${port}`)
})