const { webcrypto: crypto } = require('crypto');
const { yescrypt_kdf } = require('../index');

const getRandomHex = () => Buffer.from(crypto.getRandomValues(new Uint8Array(32)));

//const salt = 'salt';

const num = 5;

function createCases() {
    const cases = [];

    for (let i = 0; i < num; ++i) {
        const passwd = getRandomHex().toString('hex');
        const salt = getRandomHex().toString('hex');

        const output = yescrypt_kdf(Buffer.from(passwd), Buffer.from(salt));
        
        cases.push({
            passwd,
            salt,
            output: output.toString('hex'),
        });
    }

    console.log(cases);
}

createCases();