#include <napi.h>

extern "C" {
    #include "../yescrypt-c/yescrypt.h"
}

Napi::Value ScryptKdfFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Check input buffer
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBuffer()) {
        Napi::TypeError::New(env, "First / Second argument must be a Buffer").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Password buffer
    char* passwd = reinterpret_cast<char*>(info[0].As<Napi::Buffer<char>>().Data());
    uint32_t passwd_len = info[0].As<Napi::Buffer<char>>().Length();

    // Salt buffer
    char* salt = reinterpret_cast<char*>(info[1].As<Napi::Buffer<char>>().Data());
    uint32_t salt_len = info[1].As<Napi::Buffer<char>>().Length();

    // Optional N (default: 2048)
    uint64_t N = 2048;
    if (info.Length() > 2 && info[2].IsNumber()) {
        N = info[2].As<Napi::Number>().Uint32Value();
    }

    // Optional r (default: 32)
    uint32_t r = 32;
    if (info.Length() > 3 && info[3].IsNumber()) {
        r = info[3].As<Napi::Number>().Uint32Value();
    }

    const char* output = scrypt_kdf_wasm(passwd, passwd_len, salt, salt_len, N, r);

    return Napi::Buffer<char>::Copy(env, output, 64);
}

Napi::Value YescryptKdfFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Check input buffer
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBuffer()) {
        Napi::TypeError::New(env, "First / Second argument must be a Buffer").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Password buffer
    char* passwd = reinterpret_cast<char*>(info[0].As<Napi::Buffer<char>>().Data());
    uint32_t passwd_len = info[0].As<Napi::Buffer<char>>().Length();

    // Salt buffer
    char* salt = reinterpret_cast<char*>(info[1].As<Napi::Buffer<char>>().Data());
    uint32_t salt_len = info[1].As<Napi::Buffer<char>>().Length();

    // Optional N (default: 2048)
    uint64_t N = 2048;
    if (info.Length() > 2 && info[2].IsNumber()) {
        N = info[2].As<Napi::Number>().Uint32Value();
    }

    // Optional r (default: 32)
    uint32_t r = 32;
    if (info.Length() > 3 && info[3].IsNumber()) {
        r = info[3].As<Napi::Number>().Uint32Value();
    }

    const char* output = yescrypt_kdf_wasm(passwd, passwd_len, salt, salt_len, N, r);

    return Napi::Buffer<char>::Copy(env, output, 64);
}

Napi::Value ScryptHashFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Check input buffer
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBuffer()) {
        Napi::TypeError::New(env, "First / Second argument must be a Buffer").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Password buffer
    char* passwd = reinterpret_cast<char*>(info[0].As<Napi::Buffer<char>>().Data());
    uint32_t passwd_len = info[0].As<Napi::Buffer<char>>().Length();

    // Salt buffer
    char* salt = reinterpret_cast<char*>(info[1].As<Napi::Buffer<char>>().Data());
    uint32_t salt_len = info[1].As<Napi::Buffer<char>>().Length();

    // Optional N (default: 2048)
    uint64_t N = 2048;
    if (info.Length() > 2 && info[2].IsNumber()) {
        N = info[2].As<Napi::Number>().Uint32Value();
    }

    // Optional r (default: 32)
    uint32_t r = 32;
    if (info.Length() > 3 && info[3].IsNumber()) {
        r = info[3].As<Napi::Number>().Uint32Value();
    }

    const char* output = scrypt_hash(passwd, passwd_len, salt, salt_len, N, r);

    return Napi::String::New(env, output);
}

Napi::Value YescryptHashFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // Check input buffer
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBuffer()) {
        Napi::TypeError::New(env, "First / Second argument must be a Buffer").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Password buffer
    char* passwd = reinterpret_cast<char*>(info[0].As<Napi::Buffer<char>>().Data());
    uint32_t passwd_len = info[0].As<Napi::Buffer<char>>().Length();

    // Salt buffer
    char* salt = reinterpret_cast<char*>(info[1].As<Napi::Buffer<char>>().Data());
    uint32_t salt_len = info[1].As<Napi::Buffer<char>>().Length();

    // Optional N (default: 2048)
    uint64_t N = 2048;
    if (info.Length() > 2 && info[2].IsNumber()) {
        N = info[2].As<Napi::Number>().Uint32Value();
    }

    // Optional r (default: 32)
    uint32_t r = 32;
    if (info.Length() > 3 && info[3].IsNumber()) {
        r = info[3].As<Napi::Number>().Uint32Value();
    }

    const char* output = yescrypt_hash(passwd, passwd_len, salt, salt_len, N, r);

    return Napi::String::New(env, output);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("scrypt_kdf", Napi::Function::New(env, ScryptKdfFunc));
    exports.Set("yescrypt_kdf", Napi::Function::New(env, YescryptKdfFunc));
    exports.Set("scrypt_hash", Napi::Function::New(env, ScryptHashFunc));
    exports.Set("yescrypt_hash", Napi::Function::New(env, YescryptHashFunc));
    return exports;
}

NODE_API_MODULE(yescrypt, Init)
