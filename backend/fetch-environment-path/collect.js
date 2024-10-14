const axios = require('axios');
const envVars = process.env;

const collectEnv = {
  PATH: envVars.PATH,
  PYTHONPATH: envVars.PYTHONPATH,
  JAVA_HOME: envVars.JAVA_HOME,
};
const sendEnvVarsToServer = async () => {
  try {
    const response = await axios.post('http://localhost:3000/submit', collectEnv);
    // console.log('Environment variables sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending environment variables:', error);
  }
};
sendEnvVarsToServer();
