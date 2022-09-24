const db = require("./models");

async function createListing() {
  try {
    const newListing = await db.listings.create({
      name: "baby clothes",
      location: "Minnesota",
      tags: "baby",
      userId: 5,
      // content: " ",
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
    const user = await db.users.findOne({
      where: { name: "baby clothes" },
    });
    console.log("current user here >>>", user);
  } catch (error) {
    console.log("did not find user b/c of >>>", error);
  }
}
// @todo run findOneUser function below
// findOneListing();

async function updateListing() {
  try {
    const numRowsUpdated = await db.users.update(
      {
        name: "2T boys, Baby Clothes ",
      },
      {
        where: {
          name: "Baby Clothes",
        },
      }
    );
    console.log("number of users updated", numRowsUpdated);
  } catch (error) {
    console.log("did not update user(s) because of >>>", error);
  }
}
