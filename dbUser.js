const db = require("./models");

// Implement CRUD for user model

// CREATE
async function createUser() {
  try {
    const newUser = await db.users.create({
      name: "Jared Hayes",
      location: "Minnesota",
      email: "jhayes907@gmail.com",
      password: "1234admin",
    });
    console.log("my new user >>>", newUser);
  } catch (error) {
    console.log("new user was not created b/c of >>>", error);
  }
}
// @todo run createUser function below
createUser();

// READ
// find one user
async function findOneUser() {
  try {
    const user = await db.users.findOne({
      where: { name: "Jared Hayes" },
    });
    console.log("current user here >>>", user);
  } catch (error) {
    console.log("did not find user b/c of >>>", error);
  }
}
// @todo run findOneUser function below
// findOneUser();

// find all users
async function findAllUsers() {
  try {
    const users = await db.users.findAll();
    console.log("all users here >>>", users);
  } catch (error) {
    console.log("did not find all users because of >>>", error);
  }
}
// @todo run findAllUsers function below

// find one user
async function findOrCreate() {
  try {
    const users = await db.users.findOrCreate({
      where: { email: "briansmith@gmail.com" },
      defaults: {
        name: "Brian Smith",
      },
    });
    console.log("all users here >>>", users);
  } catch (error) {
    console.log("did not find all users because of >>>", error);
  }
}
// @todo run findOrCreate function below

// UPDATE
async function updateUser() {
  try {
    const numRowsUpdated = await db.users.update(
      {
        name: "Brian Taco",
      },
      {
        where: {
          email: "briansmith@gmail.com",
        },
      }
    );
    console.log("number of users updated", numRowsUpdated);
  } catch (error) {
    console.log("did not update user(s) because of >>>", error);
  }
}
// @todo run updateUser function below

// DELETE
async function deleteUser() {
  try {
    let numOfRowsDeleted = await db.users.destroy({
      where: { name: "Jared Hayes" },
    });
    console.log("number of rows deleted >>>", numOfRowsDeleted);
  } catch (error) {
    console.log("did not delete user(s) because of >>>", error);
  }
}
// deleteUser();
