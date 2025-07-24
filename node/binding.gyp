{
    "targets": [
        {
            "target_name": "yescrypt",
            "sources": [
                "yescrypt.cc",
                "../yescrypt-c/sha256.c",
                "../yescrypt-c/yescrypt.c",
                "../yescrypt-c/yescrypt-common.c",
                "../yescrypt-c/yescrypt-opt.c",
                "../yescrypt-c/insecure_memzero.h",
                "../yescrypt-c/insecure_memzero.c",
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "cflags_cc": [
                "-std=c++17"
            ],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
        }
    ]
}
