const db = require("./models");

async function createListing() {
  try {
    const newListing = await db.listing.create({
      name: "baby clothes",
      location: "Minnesota",
      tags: "baby",
      userId: 1,
    });
    console.log("my new listing >>>", newListing);
  } catch (error) {
    console.log("new listing was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
createListing();
