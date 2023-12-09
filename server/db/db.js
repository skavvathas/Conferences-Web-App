/*const mysql = require('mysql');

// Create a connection pool
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'spirosmysql01',
  database: 'conference',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});

module.exports = db;*/

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Change to your MySQL server host
  user: 'root', // Change to your MySQL username
  database: 'conference', // Change to your MySQL database name
  password: 'spirosmysql01', // Change to your MySQL password
  waitForConnections: true,
  connectionLimit: 10, // You can adjust this based on your needs
  queueLimit: 0,
});

// Export the pool for use in other modules
module.exports = pool.promise();