import app from './app';
import config from './config';

const PORT = config.get('serverPort');
const env = config.get('env');

app.listen(PORT, () => {
  console.log(`Application listening on ${PORT} in environment: ${env}`);
});
