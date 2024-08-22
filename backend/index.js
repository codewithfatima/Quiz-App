import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';


// MongoDB connection
const MONGO = process.env.MONGO;
const app = express();
const port = process.env.PORT ||  5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());



// MongoDB connection
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const resultSchema = new mongoose.Schema({
  name: String,
  score: Number,
  totalScore: Number,
  remarks: String,
});

const Result = mongoose.model('Result', resultSchema);

app.post('/saveResult', async (req, res) => {
  const { name, score, totalScore, remarks } = req.body;
  try {
    const newResult = new Result({ name, score, totalScore, remarks });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ error: 'Error saving result' });
  }
});

// Fetch results from the database
app.get('/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
});
app.get('/',(req, res) =>{
    try{
    res.json("Get Request")
    }catch(error){
        res.json(error);
    }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
