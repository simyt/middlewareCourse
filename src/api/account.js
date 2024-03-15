// handle requests for accounts
express = require("express");
database = require("../database/database");

router = express.Router();

// a GET API to fetch all the accounts
router.get("/all", (request, response) => {
  database.mysqlConnection.query("SELECT * FROM account", (error, results) => {
    if (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
    } else {
      response.status(200).send(results);
    }
  });
});

// a GET API to fetch account by id
router.get("/by-uid", (request, response) => {
    database.mysqlConnection.query(
        `SELECT * FROM account WHERE user_id=${request.query.user_id}`,
        (error, results) => {
      if (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
      } else {
        response.status(200).send(results);
      }
    });
  });

// a GET API to create new account
router.post("/add", (request, response) => {
  database.mysqlConnection.query(
      `INSERT INTO (user_id, account_name, account_type, balance, credit_limit)
      values ('${request.body.user_id}','${request.body.account_name}',
       '${request.body.account_type}', '${request.body.balance}',
       '${request.body.credit_limit}')`,
      (error, results) => {
    if (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
    } else {
      response.status(200).send(results);
    }
  });
});


router.delete("/delete", (request, response) => {
    database.mysqlConnection.query(
        `DELETE FROM account WHERE id=${request.query.account_id}`,
        (error, results) => {
      if (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
      } else {
        response.status(200).send("Account deleted");
      }
    });
  });


module.exports = { router };