const express = require("express");
const cors = require("cors");
const path = require("path");
const { jwtAuth, userRoute, adminRoute } = require('./app/routes');

const app = express();

const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use('/api/auth', jwtAuth);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);


app.get("/*", (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});