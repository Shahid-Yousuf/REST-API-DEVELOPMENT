const bodyParser = require('body-parser');
const urlEncoder = bodyParser.urlencoded({extended:false});
const jsonEncoder = bodyParser.json();

module.exports = {
    urlEncoder,
    jsonEncoder
}