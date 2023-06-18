const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');

app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  server: 'formsubmissionserver.database.windows.net',
  database: 'Formsubmission',
  user: 'kalyan',
  password: 'qwertynaga@1',
  port: 1433
};

app.post('/submitForm', async (req, res) => {
  let fName = req.body.fname;
  let email = req.body.email;

  try {
    let pool = await sql.connect(dbConfig);
    await pool.request()
      .input('input_parameter1', sql.VarChar, fName)
      .input('input_parameter2', sql.VarChar, email)
      .query('insert into tableName (fName, email) values (@input_parameter1, @input_parameter2)');
    res.send('Form submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
