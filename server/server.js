const express = require('express');
const app = express();
const cors = require('cors')

const corsOptions = {
	origin : 'http://localhost:5173/',
	 optionsSuccessStatus: 200 
	}


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use(cors(corsOptions));
app.get('./', (req, res) => {
	console.log('Recieved response');
	res.send('Hello world!!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));