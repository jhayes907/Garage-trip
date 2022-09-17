const db = require("./models");

async function createItems() {
  try {
    const newItems = await db.items.create({
      name: "vinyl records",
      tags: "vinyl",
      userId: 1,
      listingId: 1,
    });
    console.log("my new items >>>", newItems);
  } catch (error) {
    console.log("new item was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
createItems();
