const express = require('express');
const app = express();
const cors = require('cors')

const corsOptions = {
	origin : 'http://localhost:5173',
	methods:["POST", "GET"],
	 optionsSuccessStatus: 200 
	}


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
app.options('/',cors(corsOptions))
// app.use(cors(corsOptions));
app.get('/', cors(corsOptions),(req, res, next) => {
	console.log('Recieved response');
	res.send('Hello world!!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));