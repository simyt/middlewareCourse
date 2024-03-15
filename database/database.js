//slide26
const mysql = require("mysql");

require("dotenv").config({path: './config/.env'});

parameters = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
};

const mysqlConnection = mysql.createConnection(parameters);

mysqlConnection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to MySQL")
    }
});

// mysqlConnection.query(`SELECT * from customers`, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

// mysqlConnection.query(`delete from customers where id = ${id}`, (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted");
//     }
// });

// mysqlConnection.query(
//     `insert into customer(customer_type,customer_name,customer_email,customer_wallet,customer_tolerance) values (${type},'${name}',${wallet}, ${tolerance})`,
//     (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             if (results["affectedRows"] != 0) {
//                 console.log("Added");
//             }
//         }
//     }
// );

// mysqlConnection.query('SELECT * FROM books ORDER BY unit_price ASC', (err, results) => {
//     if (err) {
//         console.error('An error occurred while fetching sorted books:', err);
//         return;
//     }
//     console.log('Books sorted by unit price (Lowest to Highest):', results);
// });

// const query = `
// SELECT p.*, b.title, b.ISBN
// FROM purchases p
// JOIN books b ON p.book_id = b.ISBN
// WHERE b.title = 'Lord of the Rings' AND p.timestamp > '2020-01-01';
// `;

// mysqlConnection.query(query, (err, results) => {
//     if (err) {
//         console.error('An error occurred while fetching the purchases:', err);
//         return;
//     }
//     console.log('Details of purchases made after 2020-01-01 for "Lord of the Rings":', results);
// });

// const query = `
// SELECT 
//     c.first_name, 
//     c.last_name, 
//     YEAR(p.timestamp) AS purchase_year, 
//     COUNT(p.book_id) AS books_purchased
// FROM 
//     customers AS c
// JOIN 
//     purchases AS p ON c.id = p.cust_id
// GROUP BY 
//     c.id, purchase_year
// ORDER BY 
//     c.last_name, c.first_name, purchase_year;
// `;

// mysqlConnection.query(query, (err, results) => {
//     if (err) {
//         console.error('An error occurred:', err);
//         return;
//     }
//     console.log('Number of books purchased by each customer for each year:', results);
// });

// const query = `
// SELECT 
//     b.ISBN,
//     b.title,
//     b.author_id,
//     COUNT(p.book_id) AS total_sales
// FROM 
//     books AS b
// JOIN 
//     purchases AS p ON b.ISBN = p.book_id
// GROUP BY 
//     b.ISBN
// ORDER BY 
//     total_sales DESC
// LIMIT 3;
// `;

// mysqlConnection.query(query, (err, results) => {
//     if (err) {
//         console.error('An error occurred:', err);
//         return;
//     }
//     console.log('Details of the top-3 most selling books:', results);
// });

// const query = `
// SELECT 
//     a.author_name, 
//     COUNT(p.book_id) AS total_books_sold
// FROM 
//     authors AS a
// JOIN 
//     books AS b ON a.id = b.author_id
// JOIN 
//     purchases AS p ON b.ISBN = p.book_id
// GROUP BY 
//     a.id
// ORDER BY 
//     total_books_sold DESC
// LIMIT 1
// `;
// mysqlConnection.query(query, (err, results) => {
//     if (err) {
//         console.error('An error occurred:', err);
//         return;
//     }
//     console.log('Author who sold the most books:', results);
// });

const query = `
SELECT 
    a.author_name, 
    SUM(p.quantity * b.unit_price) AS total_revenue
FROM 
    authors AS a
JOIN 
    books AS b ON a.id = b.author_id
JOIN 
    purchases AS p ON b.ISBN = p.book_id
GROUP BY 
    a.id
ORDER BY 
    total_revenue DESC
LIMIT 1;
`;

mysqlConnection.query(query, (err, results) => {
    if (err) {
        console.error('An error occurred:', err);
        return;
    }
    if (results.length > 0) {
        console.log('Author who made the most money:', results[0]);
    } else {
        console.log('No data found.');
    }
});
