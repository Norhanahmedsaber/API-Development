import express from 'express';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(userRoutes);
app.use(organizationRoutes);

export default app;
