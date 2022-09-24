const db = require("./models");

async function createComments() {
  try {
    const newComments = await db.comment.create({
      title: "interested",
      body: "Is this still available?",
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
