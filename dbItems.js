const db = require("./models");

async function createItem() {
  try {
    const newItems = await db.item.create({
      name: "size 14 signed championship game sneekers",
      tags: "collector",
      location: "Chicago",
      content: "Better grab em quick!",
      userId: 3,
      listingId: 3,
    });
    console.log("my new items >>>", newItems);
  } catch (error) {
    console.log("new item was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
// createItem();
