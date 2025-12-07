const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const projectsRouter = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/projects', projectsRouter);

// Basic health check
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
