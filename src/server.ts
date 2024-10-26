import app from './app';
import { dbConnection } from './utils/DbConnection'
import dotenv from 'dotenv';


dotenv.config();
dbConnection()

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
