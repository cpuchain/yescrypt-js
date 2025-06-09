#include <napi.h>

extern "C" {
    #include "../yescrypt-c/yescrypt.h"
}

struct KdfArgs {
    char* passwd;
    uint32_t passwd_len;
    char* salt;
    uint32_t salt_len;
    uint64_t N;
    uint32_t r;
    uint32_t p;
    uint32_t t;
};

KdfArgs ParseKdfArgs(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    KdfArgs args;

    // Check input buffer
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsBuffer()) {
        Napi::TypeError::New(env, "First / Second argument must be a Buffer").ThrowAsJavaScriptException();
        return args;
    }

    // Password buffer
    args.passwd = reinterpret_cast<char*>(info[0].As<Napi::Buffer<char>>().Data());
    args.passwd_len = info[0].As<Napi::Buffer<char>>().Length();

    // Salt buffer
    args.salt = reinterpret_cast<char*>(info[1].As<Napi::Buffer<char>>().Data());
    args.salt_len = info[1].As<Napi::Buffer<char>>().Length();

    // Optional N (default: 4096)
    args.N = 4096;
    if (info.Length() > 2 && info[2].IsNumber()) {
        args.N = info[2].As<Napi::Number>().Uint32Value();
    }

    // Optional r (default: 32)
    args.r = 32;
    if (info.Length() > 3 && info[3].IsNumber()) {
        args.r = info[3].As<Napi::Number>().Uint32Value();
    }

    // Optional p (default: 1)
    args.p = 1;
    if (info.Length() > 4 && info[4].IsNumber()) {
        args.p = info[4].As<Napi::Number>().Uint32Value();
    }

    // Optional t (default: 0)
    args.t = 0;
    if (info.Length() > 5 && info[5].IsNumber()) {
        args.t = info[5].As<Napi::Number>().Uint32Value();
    }

    return args;
}

Napi::Value ScryptKdfFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    KdfArgs args = ParseKdfArgs(info);

    const char* output = scrypt_kdf_wasm(args.passwd, args.passwd_len, args.salt, args.salt_len, args.N, args.r, args.p, args.t);

    return Napi::Buffer<char>::Copy(env, output, 64);
}

Napi::Value YescryptKdfFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    KdfArgs args = ParseKdfArgs(info);

    const char* output = yescrypt_kdf_wasm(args.passwd, args.passwd_len, args.salt, args.salt_len, args.N, args.r, args.p, args.t);

    return Napi::Buffer<char>::Copy(env, output, 64);
}

Napi::Value ScryptHashFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    KdfArgs args = ParseKdfArgs(info);

    const char* output = scrypt_hash(args.passwd, args.passwd_len, args.salt, args.salt_len, args.N, args.r, args.p, args.t);

    return Napi::String::New(env, output);
}

Napi::Value YescryptHashFunc(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    KdfArgs args = ParseKdfArgs(info);

    const char* output = yescrypt_hash(args.passwd, args.passwd_len, args.salt, args.salt_len, args.N, args.r, args.p, args.t);

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
