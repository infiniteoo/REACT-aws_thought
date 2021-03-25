const { LexModelBuildingService } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: 'user-images-9f42be0b-795c-4a33-922d-6316dfe0d65a',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer
    };

    return imageParams;
}


module.exports = params;
