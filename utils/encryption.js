const crypto = require('crypto');


const encryptionKey = process.env.ENCRYPTION_KEY;


function encryptPhoneNumber(data) {
    const cipher = crypto.createCipheriv('aes-256-ecb', encryptionKey, null);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}


// Encrypt the data using the initial IV
// const originalData = 'This is the original dat kdkda===.';
// const encryptedData1 = encryptData(originalData);

function decryptPhoneNumber(encryptedData) {
    const decipher = crypto.createDecipheriv('aes-256-ecb', encryptionKey, null);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}


// const decryptedData = decryptData(encryptedData1)

module.exports = { encryptPhoneNumber, decryptPhoneNumber };
