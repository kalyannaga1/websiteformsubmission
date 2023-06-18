const express = require('express');
const path = require('path');
const app = express();
const sql = require('mssql');

app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  server: 'formsubmissionserver.database.windows.net',
  database: 'Formsubmission',
  user: 'kalyan' ,
  password: 'qwertynaga@1',
  port: 1433
};

app.get('/', (req, res) => {
  // Serve the HTML form when the user visits the root URL
  res.sendFile(path.join(__dirname, '/submitform.html'));
});

app.post('/submitForm', async (req, res) => {
  let pool;
  try {
    pool = await sql.connect(dbConfig);
    let fName = req.body.fname;
    let email = req.body.email;

    await pool.request()
      .input('input_parameter1', sql.VarChar, fName)
      .input('input_parameter2', sql.VarChar, email)
      .query('insert into tableName (fName, email) values (@input_parameter1, @input_parameter2)');
    res.send('Form submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  } finally {
    pool.close();  //close the connection pool
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
