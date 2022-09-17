const db = require("./models");

async function createComments() {
  try {
    const newComments = await db.comments.create({
      title: "Wonderful",
      body: "Hello. Just wanted to say your sight is the bees knees!",
      userId: 1,
      listingId: 1,
    });
    console.log("my new comments >>>", newComments);
  } catch (error) {
    console.log("new comment was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
createComments();
