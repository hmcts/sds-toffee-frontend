const axios = require('axios');
const { Logger } = require('@hmcts/nodejs-logging');
const { RECIPE_BACKEND_URL } = process.env;

const logger = Logger.getLogger('index.js');

const get = async (req, res) => {
  logger.info('Yay, logging!');

  const options = {
    url: `${RECIPE_BACKEND_URL}/recipes`,
    method: 'get',
    responseType: 'json'
  };

  try {
    const { recipes } = await axios(options)
        .then(function(response) {
          return response.data;
        });

    return res.render('index', { recipes });
  } catch (err) {
    logger.error(err.stack);
    return res
      .status(500)
      .render('error', { message: 'Problem communicating with backend' });
  }
};

module.exports = get;
