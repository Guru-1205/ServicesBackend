const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Services:Services2024@clusterservice.wofj5uv.mongodb.net/service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create Schema
const SMdetailsSchema = new mongoose.Schema({
  Name: String,
  ID: String,
  Contact: String,
  Shift: String,
  VDT: String,
  VDN: String,
  date: String,
});

// Create Model
const SMdetails = mongoose.model('SMdetails', SMdetailsSchema);

// POST route to add a service member
app.post('/add', async (req, res) => {
  const { SMname, SMnumber, SMcontact, SMshift, SMVDN, SMVDT, SMdate } = req.body;
  try {
    await SMdetails.create({
      Name: SMname,
      ID: SMnumber,
      Contact: SMcontact,
      Shift: SMshift,
      VDT: SMVDT,
      VDN: SMVDN,
      date: SMdate,
    });
    res.status(201).send('Service member added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding service member');
  }
});

// GET route to read all service members
app.get('/read', async (req, res) => {
  try {
    const result = await SMdetails.find({});
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading service members');
  }
});

// DELETE route to delete a service member by ID
app.delete('/delete/:SMnumber', async (req, res) => {
  const SMnumber = req.params.SMnumber;
  try {
    await SMdetails.deleteOne({ ID: SMnumber });
    res.send(`Service member with ID ${SMnumber} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting service member');
  }
});

// PUT route to update a service member by ID
app.put('/update/:SMnumber', async (req, res) => {
  const { Name, Contact, Shift, date, VDT, VDN } = req.body;
  const id = req.params.SMnumber;
  try {
    await SMdetails.findOneAndUpdate(
      { ID: id },
      { $set: { Name, Contact, Shift, VDT, VDN, date } },
      { new: true }
    );
    console.log('Service member updated successfully');
    res.json({ message: 'Service member updated successfully' });
  } catch (error) {
    console.error('Error updating service member:', error);
    res.status(500).send('Error updating service member');
  }
});

// Start the server
app.listen(3035, () => {
  console.log('Server is running on port 3035');
});
