#include "yescrypt.h"

const char* scrypt_wasm(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r) {
    char output[32];

    scrypt_hash(passwd, passwdLen, salt, saltLen, N, r, output, 32);

    return output;
}

const char* yescrypt_wasm(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r) {
    char output[32];

    yescrypt_hash(passwd, passwdLen, salt, saltLen, N, r, output, 32);

    return output;
}

void scrypt_hash(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, char* output, uint32_t outputLen) {
    yescrypt_hasher(0, passwd, passwdLen, salt, saltLen, N, r, output, outputLen);
}

void yescrypt_hash(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, char* output, uint32_t outputLen) {
    // 182
    yescrypt_hasher(YESCRYPT_DEFAULTS, passwd, passwdLen, salt, saltLen, N, r, output, outputLen);
}

void yescrypt_hasher(yescrypt_flags_t flags, const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, char* output, uint32_t outputLen) {
    yescrypt_local_t local;

    // Using recommended value from PARAMETERS
    yescrypt_params_t params = {
        .flags = flags,
        .N = N,
        .r = r,
        .p = 1,
        .t = 0,
        .g = 0
    };

    int result = 0;

    // Current version of yescrypt_local won't failed on init and free
    yescrypt_init_local(&local);

    result = yescrypt_kdf(
        NULL,
        &local,
        (const uint8_t *) passwd,
        passwdLen,
        (const uint8_t *) salt,
        saltLen,
        &params,
        (const uint8_t *) output,
        outputLen
    );

    if (result == 0) {
        // Current version of yescrypt_local won't failed on init and free
        yescrypt_free_local(&local);
    }
}