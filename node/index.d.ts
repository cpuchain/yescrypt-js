export function scrypt_kdf(passwd: Buffer, salt: Buffer, N?: number, r?: number, p?: number, t?: number): Buffer;
export function yescrypt_kdf(passwd: Buffer, salt: Buffer, N?: number, r?: number, p?: number, t?: number): Buffer;
export function scrypt_hash(passwd: Buffer, salt: Buffer, N?: number, r?: number, p?: number, t?: number): Buffer;
export function yescrypt_hash(passwd: Buffer, salt: Buffer, N?: number, r?: number, p?: number, t?: number): Buffer;
