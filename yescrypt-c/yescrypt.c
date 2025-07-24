#include "yescrypt.h"

const char* scrypt_kdf_wasm(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, uint32_t p, uint32_t t) {
    char* output = malloc(64);

    yescrypt_kdf_wrap(0, passwd, passwdLen, salt, saltLen, N, r, p, t, output, 64);

    return output;
}

const char* yescrypt_kdf_wasm(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, uint32_t p, uint32_t t) {
    char* output = malloc(64);

    yescrypt_kdf_wrap(YESCRYPT_DEFAULTS, passwd, passwdLen, salt, saltLen, N, r, p, t, output, 64);

    return output;
}

void yescrypt_kdf_wrap(yescrypt_flags_t flags, const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, uint32_t p, uint32_t t, char* output, uint32_t outputLen) {
    yescrypt_local_t local;

    // Using recommended value from PARAMETERS
    yescrypt_params_t params = {
        .flags = flags,
        .N = N,
        .r = r,
        .p = p,
        .t = t,
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
        (uint8_t *) output,
        outputLen
    );

    if (result == 0) {
        // Current version of yescrypt_local won't failed on init and free
        yescrypt_free_local(&local);
    }
}

const char* scrypt_hash(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, uint32_t p, uint32_t t) {
    // Using recommended value from PARAMETERS
    yescrypt_params_t params = {
        .flags = 0,
        .N = N,
        .r = r,
        .p = p,
        .t = t,
        .g = 0
    };

    uint8_t* setting = yescrypt_encode_params(&params, (const uint8_t *) salt, saltLen);

    uint8_t* hash = yescrypt((const uint8_t *) passwd, setting);

    return (char *)hash;
}

const char* yescrypt_hash(const char* passwd, uint32_t passwdLen, const char* salt, uint32_t saltLen, uint64_t N, uint32_t r, uint32_t p, uint32_t t) {
    // Using recommended value from PARAMETERS
    yescrypt_params_t params = {
        .flags = YESCRYPT_DEFAULTS,
        .N = N,
        .r = r,
        .p = p,
        .t = t,
        .g = 0
    };

    uint8_t* setting = yescrypt_encode_params(&params, (const uint8_t *) salt, saltLen);

    uint8_t* hash = yescrypt((const uint8_t *) passwd, setting);

    return (char *)hash;
}