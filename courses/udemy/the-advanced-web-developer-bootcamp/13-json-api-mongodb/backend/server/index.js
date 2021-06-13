let express = require("express");
let app = express();

const PORT = 5000;

app.get('/', (req, res) => {
  res.json({
    id: 0,
    name: 'Ciao'
  })
});

app.listen(PORT, () => {
  console.log("App is running on port: " + PORT);
});
