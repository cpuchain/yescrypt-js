import { webcrypto as crypto } from 'crypto';
import { yescrypt_kdf } from '../index.js';

interface TestCases {
    passwd: string;
    salt: string;
    N?: number;
    r?: number;
    p?: number;
    t?: number;
    useScrypt?: boolean;
    output: string;
}

function getRandomBuffer() {
    return Buffer.from(crypto.getRandomValues(new Uint8Array(32)));
}

//const salt = 'salt';

const num = 5;

function createCases() {
    const cases: TestCases[] = [];

    for (let i = 0; i < num; ++i) {
        const passwd = getRandomBuffer().toString('hex');
        const salt = getRandomBuffer().toString('hex');

        const output = yescrypt_kdf(Buffer.from(passwd), Buffer.from(salt));

        cases.push({
            passwd,
            salt,
            output: output.toString('hex'),
        });
    }

    console.log(JSON.stringify(cases, null, 4));
}

createCases();
