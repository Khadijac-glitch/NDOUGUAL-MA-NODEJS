const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const RouteUsers = require("./router/register");
const emailRoutes = require("./router/email");
const reservation = require("./router/reservation");
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");
const newsletterRoutes = require("./router/newletters");
//Forgot password
const forgotPasswordRoutes = require("./router/forgotpassword");

//Reservation table
const reservationRoutes = require("./router/reservation-table");
const employeeRoutes = require("./router/listedesEmployes");

// Ventes
const venteRoutes = require("./router/vente");

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const produitRoutes = require("./router/liste-produit");
const listedesEmployes = require("./models/listedesEmployes");

//Multer
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//multer
app.use("/uploads", express.static("uploads"));

//Test
// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation avec Swagger",
    },
  },
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Route pour la documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "https://petstore.swagger.io/v2/swagger.json",
    },
  })
);

app.use("/api/register", RouteUsers);
app.use("/api/auth", require("./router/auth"));
app.use("/api/admin/", RouteUsers);
app.use("/api/email", emailRoutes);
app.use("/subscribe", newsletterRoutes);
app.use("/api/employes", employeeRoutes);

app.use("/admin", adminRouteProduit);
app.use("/user", adminRouteProduit);
app.use(localisationRoutes);
app.use("/admin", produitRoutes);
app.use("/api/reservation", reservation);
//forgot password
app.use("/api", forgotPasswordRoutes);
//Reservation table
app.use("/api/reservation-table", reservationRoutes);
// Vente
app.use("api/ventes", venteRoutes);
// Redirection de la racine vers /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Routes de l'application

const PORT = process.env.PORT || 8080;
mongoose
  .connect(
    "mongodb+srv://dija5631:dbrestau@cluster0.a5lixnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

module.exports = app;
