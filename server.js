require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const aiRoutes = require('./src/routes/aiRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const dataRoutes = require('./src/routes/dataRoutes');

const app = express();

const corsOptions = {
  origin: 'https://personal-api-ftdn.onrender.com',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/ai', aiRoutes);
app.use('/api/data', dataRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
