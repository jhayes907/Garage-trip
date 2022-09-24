const db = require("./models");

async function createListing() {
  try {
    const newListing = await db.listing.create({
      name: "Can't touch this!",
      location: "Chicago",
      tags: "Unbeatable",
      userId: 3,
      content: "It doesn't matter what I'm selling does it? Come get a piece of the Goats life.",
    });
    console.log("my new listing >>>", newListing);
  } catch (error) {
    console.log("new listing was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
createListing();

async function findOneListing() {
  try {
    const listing = await db.listing.findOne({
      where: { name: "baby clothes" },
    });
    console.log("current listing here >>>", listing);
  } catch (error) {
    console.log("did not find listing b/c of >>>", error);
  }
}
// @todo run findOneUser function below
// findOneListing();

async function updateListing() {
  try {
    const numRowsUpdated = await db.listing.update(
      {
        name: "2T boys, Baby Clothes ",
      },
      {
        where: {
          name: "Baby Clothes",
        },
      }
    );
    console.log("number of listing updated", numRowsUpdated);
  } catch (error) {
    console.log("did not update listing(s) because of >>>", error);
  }
}
