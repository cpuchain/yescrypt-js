const { describe, it } = require('node:test');
const { strict: assert } = require('node:assert');
const { scrypt, yescrypt } = require('../index');

const cases = [
    {
        passwd: 'p',
        salt: 's',
        output: '14da86e5f7667a4025b15338ce3b5c600ae7db1f67da7f68e95980a2178c8c95',
    },
    {
        passwd: 'p',
        salt: 's',
        useScrypt: true,
        output: '76653b5d96817b0ee1709c1bca212e6b6a3f29a1907ac0c41fab9529ce5613e3',
    },
    // Reference tests
    {
        passwd: '',
        salt: '',
        N: 16,
        r: 1,
        useScrypt: true,
        output: '77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442',
    },
    {
        passwd: '',
        salt: '',
        N: 4,
        r: 1,
        output: '0cd5af76eb241df8119a9a122ae36920bcc7f414b9c0d58f45008060dade46b0',
    },
    {
        passwd: 'p',
        salt: 's',
        N: 16,
        r: 8,
        output: 'c8c7ff1122b0b291c3f2608948782cd689cc45579017aaa5ff8baa74a632ec99',
    },
    // Generated from case
    {
        passwd: '345b9dcf1bb52cb1f50bca18f6149de7415b2615d0fe282537ce010cebb34545',
        salt: 'salt',
        output: '6f4210c05459b51cb6eb34e84605f819672cdf4df436abfa0a0e8c161c3e1500',
    },
    {
        passwd: 'aa7f6b9ad4a8260bb37ee50989f70df23629b2e9b00885a8670b65cef2254dab',
        salt: 'salt',
        output: '2384687ef6ed60a66b0561f73d130ed0d9364f25bfd69b525d4d09eb9f454df5',
    },
    {
        passwd: 'e45d231b0673c1df0a5660ff054992a565c6573edab8e14008af6086c117d3d4',
        salt: 'salt',
        output: 'b33042e7e7758d72e0751f1a42c1c30dd9895a7180a1234fe5e4ecc07810f3b7',
    },
    {
        passwd: 'ec418c1bf9a7760c44e04afad5edcf94b1827142f60f0782585860ba0c9a421f',
        salt: 'salt',
        output: '6e1689e76363dc0f1c75726ef25349bd48152eaa8d1fca462440fc3f5a7e283a',
    },
    {
        passwd: 'fb61d581e6b99f2c5fa29e7ca559365504476b338e2cf7f0ffe0025efbe8328f',
        salt: 'salt',
        output: 'de9714564b2b9dc000d621c2fd86a061119e7b0affe9b2dd934873bee2613049',
    },
    {
        passwd: 'a29919b04dc807b1dc581f71f49ea670cc9a90f79dea7dee2b4980a961a8ac1e',
        salt: '78744900b7922af5670d40e858151396ec001ed35e91e0a1dc57bf39afd73bd0',
        output: 'd6348ce8b352ce386ef62f56355b1f62da302afa613be53fdfd2cbc1f37b2aa2',
    },
    {
        passwd: 'bb74288de0f1eeb46f3c9b015bb5d9b8625e3c9582564654ea10ebd2ac9c460a',
        salt: '9d6131dca631a3901110b61e289011c0b87d39a257073e4884c95003617e0dc2',
        output: '76d446bc7e52be635b568fbd227f2d278b04ad257b07646ef5b90d32bb4c09d4',
    },
    {
        passwd: '790d99a453a76b382da2a0019db26a034e72a6b8da93713e1bb3d7a7b588072d',
        salt: '3c5bb59594ea6adb5b56f652dbec0795514cc179818a8c12d941699c36720ee4',
        output: '4428224752ddc24cd4c19d3989290242179dc0313a42e4d709c20f9b07b3733f',
    },
    {
        passwd: 'c003b766098ea39c1ac90ea18c18addfeb1f2f5abf3963d3d928eefbe1c86311',
        salt: '528f3b2ab745cd6a982383f04dc70ef0c9ffb7f14637b008b7da1ede683f4077',
        output: 'a6583e834e96137271cb038378541fb734a6a0e4ca46762611123a33b6d42b31',
    },
    {
        passwd: '3abab7505195f287466a12b102c49de1df367102e7686d1ee0b80aca8f6371c2',
        salt: '3b0056683fa997be98c1512024195d1668ffc3250a5a3add12ccadacaf33e537',
        output: '277b172741a5ede26a53e784c20cfefc04abe91f0e898fb8d219b84b5a42bde3',
    },
];

describe('Yescrypt', () => {
    it('Test Cases', () => {
        for (const { passwd, salt, N, r, useScrypt, output } of cases) {
            const hashed = useScrypt
                ? scrypt(Buffer.from(passwd), Buffer.from(salt), N, r)
                : yescrypt(Buffer.from(passwd), Buffer.from(salt), N, r);

            assert.strictEqual(output, hashed.toString('hex'));
        }
    });
});
