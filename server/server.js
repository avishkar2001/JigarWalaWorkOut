

const express = require("express");
const path = require("path");
const routes = require("./routes");
const db = require("./config/connection");
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

 
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));


// Serve up static assets 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
