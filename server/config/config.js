const TABLE_NAME = 'agrimarket';
const config = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
   // DB_CONNECTION: `mongodb+srv://iva2:iveto1234@cubicle.qzem5.mongodb.net/allForYou?retryWrites=true&w=majority`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: 'dhwgibwwg',
    CLOUDINARY_API_KEY: 114955662732567,
    CLOUDINARY_API_SECRET: 'Zgh9R20TMRHRCtokgOI6KMwFOYk',
    CLOUDINARY_STORAGE: 'oatrgwbs'
}

module.exports = config;