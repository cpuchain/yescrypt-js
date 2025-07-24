import { describe, before, it } from 'node:test';
import { strict as assert } from 'assert';
import { Yescrypt } from '../src/index.js';
import { bytesToHex } from '../src/utils.js';

type TestCases = {
    passwd: string;
    salt: string;
    N?: number;
    r?: number;
    p?: number;
    t?: number;
    useScrypt?: boolean;
    output: string;
}[];

const cases: TestCases = [
    // Reference tests
    {
        passwd: '',
        salt: '',
        N: 16,
        r: 1,
        useScrypt: true,
        output: '77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906',
    },
    {
        passwd: 'password',
        salt: 'NaCl',
        N: 1024,
        r: 8,
        p: 16,
        useScrypt: true,
        output: 'fdbabe1c9d3472007856e7190d01e9fe7c6ad7cbc8237830e77376634b3731622eaf30d92e22a3886ff109279d9830dac727afb94a83ee6d8360cbdfa2cc0640',
    },
    {
        passwd: 'pleaseletmein',
        salt: 'SodiumChloride',
        N: 16384,
        r: 8,
        useScrypt: true,
        output: '7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887',
    },
    /**
     * Not supported due to OOM for WASM
    {
        passwd: 'pleaseletmein',
        salt: 'SodiumChloride',
        N: 1048576,
        r: 8,
        useScrypt: true,
        output: '2101cb9b6a511aaeaddbbe09cf70f881ec568d574a2ffd4dabe5ee9820adaa478e56fd8f4ba5d09ffa1c6d927c40f4c337304049e8a952fbcbf45c6fa77a41a4',
    },
    **/
    {
        passwd: '',
        salt: '',
        N: 4,
        r: 1,
        useScrypt: true,
        output: 'efad0c23314cb572bc3cfb1543da42f8a8b073004c866b64ab5055a4f09fa5f571142ebfe7e05a3b92c432f31dea95ad5f9c854b6456462f4bd0f732b7cdc549',
    },
    {
        passwd: '',
        salt: '',
        N: 4,
        r: 1,
        output: '0cd5af76eb241df8119a9a122ae36920bcc7f414b9c0d58f45008060dade46b0c80922bdcc16a3ab5d201d4c6140c671be1f75272ca904739d5ad1ff672b0c21',
    },
    {
        passwd: '',
        salt: '',
        N: 4,
        r: 1,
        p: 1,
        t: 1,
        output: '23b6adf0b60c9a997f58583d80cda48c638cdc2f289edf93a70807725a0d35c468ca362c5557cc04b6811e2e730841f526d8f4f7acfbfa9e06fe1f383a71155e',
    },
    {
        passwd: 'p',
        salt: 's',
        N: 16,
        r: 8,
        p: 1,
        t: 10,
        output: 'e1f981733a94052fcd7acb1405df0bbde8e499b6a1331b775909b48c2f516c40dcc8301635b7237b8aa9f170addbc21b9896b6b33eae6af780023d1e973e9a3a',
    },
    {
        passwd: 'p',
        salt: 's',
        N: 16,
        r: 8,
        output: 'c8c7ff1122b0b291c3f2608948782cd689cc45579017aaa5ff8baa74a632ec99c3d66930fb2023bbc17112f5dac992c01dc3a3ead4c3ffb1316736cfa0bfb9e8',
    },
    // Generated from case
    {
        passwd: '875ce1f7465d1feef5d629f754c39360df06741aa0accc9cc3457bcbf41083cd',
        salt: 'salt',
        output: '9039d6b87c5fd06fff6efd38f07c597c73eec699f30c7caa1a50e0c0b38746299d5feb4e36fbf9da4ce5b4305151865e91960977782a4e2032930440974040ef',
    },
    {
        passwd: '970974a6975d6841d4986695868aec7e993babfb12c2ce1ba33f04108561e13a',
        salt: 'salt',
        output: '92458b692c470922d92463df5d25700a7dbce5dd8f98486e050baf025ca822b67d967b1655cd1565eb6319384c6d988fd536e0dcb2237152ebfd26867edb8aa4',
    },
    {
        passwd: 'd9302fababfbaf79bb4e0df24452f7896a4618a5c64ecbe453e243f9952bee73',
        salt: 'salt',
        output: 'bca00274a51442932a74c72d7b72a1b9a5a032653f92a71924de085e85a6b3db7c127753238a5a62afa49a3eb6a1964f5bdf20ba723d0a88469943cfba4faa02',
    },
    {
        passwd: 'b9ddad54f42e2ccd63a853bcb383c8997fd625dae3d3e0d3e6935313023f22fc',
        salt: 'salt',
        output: '98a5606bc3bd92265c857407cea5aa35266bd480e059bfa26e4f94eb2177afc9bab1f1cea6ead3fade08408cbcc09ea355daed93c3481b79f726819eef60552c',
    },
    {
        passwd: '4a96b204357218152d29a0573ef98aba97cabf85daa6a81798c9de441cbd7488',
        salt: 'salt',
        output: 'ca12d55b07093524c6e9d2e1e073637ce316c815ee125a8327219f17171a3cabadec6395a18f43d461983351ff0539f4344f6d3b6636ccaedbc283b6ce7c1e0e',
    },
    {
        passwd: '6dc29548d66f2e79811a209135dc50d0872f2d113f6de6fe22fe4e2c7ca1f91c',
        salt: 'a5b02d1987e5fdf1cd9f06fdd74c0aee8e43e8305ab367ca150531e8902c1837',
        output: '5fcfffd773e9ea4b625d6e006d91d498aa09dd2401cfc5a4c4740ae81cf77cf413882518eaca0e20e60e96b3fe68d41b66cd5e8fe29df418f62d0a87b7d2277e',
    },
    {
        passwd: '2a85312ac74274b5b0277a98603be55298a8b92e6815f855ed75776b0f202e92',
        salt: '52024d87fad7c2547704a2fbd485bc9f2931515a1448ca38728e93fad362acf1',
        output: 'ea38f98a2acd1e606f812df5f84ab5d4be2762ef5f04bec3cae350a99a94b55fc4018cedb72f46792c809d37534d6b1d0427625c3105e4a29874864f60980eb8',
    },
    {
        passwd: '656fdd0a5ac19a13c5de59ffdf1064069fd2f092936ab69ac878f8c3768f5029',
        salt: '45bf68f1910629ad40a8afc04b89d89ffa445dc3f1c4d2f0e17bb6f98596b13a',
        output: '0f2828cc4a307161cb523dfdc0f380ebed8a7140a138ba5fbe32c5dd456830bbee63087716eea18829f5ad9d5df943252ba2badd4b2463e2ee6f31b53affece1',
    },
    {
        passwd: '33d66a2028548f3c8af191401198f60e35b62427756180beeacfacf93b28dc10',
        salt: '2bb69eb32abc5b0aa2730def5455e1559f4fff989e4c279466568741eccfe07b',
        output: '759f7995f9808a25c1d65adc8e35d948d34d024b4b3ee2756336837c500ce6807996b73ad13119a0c32235f4651b37e54c051da832b183ee58442c8083109b6f',
    },
    {
        passwd: 'bb752fe351e5649c87facb83d62507bdaf5263529a468a5050001696675a7ae3',
        salt: 'dd26ba145e22844642fa5de4d007750378ffaeff9390e62c343819e62900c90f',
        output: 'b4c7af4e8a5ec6934b2a229282506762ec65ef00a460ef4abd2429758c6dcc051f37ff57594ca1a891f9073289fe30e7d5c76a7343dac68edffd3f76c46a0f66',
    },
];

describe('Yescrypt (WASM)', () => {
    let yescrypt: Yescrypt;

    before(async () => {
        yescrypt = await Yescrypt.init();
    });

    it('Test Cases', () => {
        for (const { passwd, salt, N, r, p, t, useScrypt, output } of cases) {
            const hashed = useScrypt
                ? yescrypt.scrypt_kdf(Buffer.from(passwd), Buffer.from(salt), N, r, p, t)
                : yescrypt.yescrypt_kdf(Buffer.from(passwd), Buffer.from(salt), N, r, p, t);

            assert.strictEqual(output, bytesToHex(hashed).replace('0x', ''));
        }
    });
});
