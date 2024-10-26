import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use(
    cors({
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      credentials: true 
    })
  );
app.use(userRoutes);
app.use(organizationRoutes);

export default app;
