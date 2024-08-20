// import express from 'express';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// console.log(__dirname);

// app.use(express.static(path.join(__dirname, '/client/dist')))

// // MongoDB connection
// const MONGO = process.env.MONGO;
// const app = express();
// const port = process.env.PORT ||  5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Configure CORS to allow requests from your Netlify site

// // MongoDB connection
// mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const resultSchema = new mongoose.Schema({
//   name: String,
//   score: Number,
//   totalScore: Number,
//   remarks: String,
// });

// const Result = mongoose.model('Result', resultSchema);

// app.post('/saveResult', async (req, res) => {
//   const { name, score, totalScore, remarks } = req.body;
//   try {
//     const newResult = new Result({ name, score, totalScore, remarks });
//     await newResult.save();
//     res.status(201).json(newResult);
//   } catch (error) {
//     res.status(400).json({ error: 'Error saving result' });
//   }
// });

// // Fetch results from the database
// app.get('/results', async (req, res) => {
//   try {
//     const results = await Result.find();
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching results' });
//   }
// });
// app.get('/',(req, res) =>{
//     try{
//     res.json("Get Request")
//     }catch(error){
//         res.json(error);
//     }
// })

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const MONGO = process.env.MONGO;
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model
const resultSchema = new mongoose.Schema({
  name: String,
  score: Number,
  totalScore: Number,
  remarks: String,
});

const Result = mongoose.model('Result', resultSchema);

// Define Routes
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

app.get('/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
});

app.get('/', (req, res) => {
  try {
    res.json("Get Request");
  } catch (error) {
    res.json(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
