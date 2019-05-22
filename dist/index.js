const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const cors = require('cors');
// const crudRepository = require('./database/crudRepository');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocumemnt = require('./swagger/swagger.json');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// crudRepository.createConnection();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/', (req, res, next) => {
    res.send('Hi from node');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//# sourceMappingURL=index.js.map