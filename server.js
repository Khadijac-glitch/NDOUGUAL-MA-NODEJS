const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

// Routes

const RouteUsers = require("./router/register");
const emailRoutes = require("./router/email");
const reservationRoutes = require("./router/reservation");
const adminRouteProduit = require("./router/liste-produit");
const localisationRoutes = require("./router/localisation-resto");
const newsletterRoutes = require("./router/newletters");
const forgotPasswordRoutes = require("./router/forgotpassword");
const reservationTableRoutes = require("./router/reservation-table");
const employeeRoutes = require("./router/listedesEmployes");
const venteRoutes = require("./router/vente");

// Multer
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

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

// Serve Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "https://petstore.swagger.io/v2/swagger.json",
    },
  })
);

// Routes
app.use("/api/register", RouteUsers);
app.use("/api/auth", require("./router/auth"));
app.use("/api/admin", adminRouteProduit); // Use a single route for admin
app.use("/api/email", emailRoutes);
app.use("/subscribe", newsletterRoutes);
app.use("/api/employes", employeeRoutes);
app.use(localisationRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/reservation-table", reservationTableRoutes);
app.use("/api/ventes", venteRoutes);

// Redirect root to Swagger docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// MongoDB Connection
const PORT = process.env.PORT || 8080;
const mongoURI =
  "mongodb+srv://khadydiop37:Ndougeulma24&@ndougeulma.csvvoxt.mongodb.net/Ndougeulma?retryWrites=true&w=majority&appName=Ndougeulma";

mongoose
  .connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);

    process.exit(1);
  });

module.exports = app;
