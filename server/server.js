const express = require("express");
const cors = require("cors");
const { jwtAuth, userRoute, adminRoute } = require('./app/routes');

const app = express();

const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/api/auth', jwtAuth);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);


app.get("/", (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});