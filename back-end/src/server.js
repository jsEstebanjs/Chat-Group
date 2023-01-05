const server = require('./app');
const { connect , cleanup , disconnect } = require('./database');

const port = process.env.PORT || 8080

connect();


server.listen(port,()=>{
    console.log(`app is run in port ${port}`)
})