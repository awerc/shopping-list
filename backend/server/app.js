import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import logger from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', routes);

if (app.get('env') === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'dist', 'frontend')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'frontend', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
