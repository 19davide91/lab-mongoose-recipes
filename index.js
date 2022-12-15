const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Bucatini all' amatriciana",
      level: "Easy Peasy",
      ingredients: [
        "1 tablespoon extra virgin olive oil",
        "4-6 ounces pancetta (Italian bacon)",
        "1 small yellow onion (roughly 6-7 ounces)",
        "1 teaspoon crushed red pepper flakes",
        "kosher salt",
        "3 garlic cloves",
        "2 tablespoons tomato paste",
        "1 (28-ounce) can crushed San Marzano or Italian plum tomatoes",
        "freshly ground black pepper",
        "1 lb (16 ounces) rigatoni, bucatini, or spaghetti",
        "1 ounce finely grated pecorino romano cheese",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "God",
    });
  })
  .then((newRecipe) => console.log("My recipe is", newRecipe.title))

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((result) => {
    result.forEach((recipe) => console.log(`Name of recipe ${recipe.title}`));
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }, { new: true });
  })

  .then(() => {
    console.log("the deleted was succesfull!");
  })

  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
    });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
