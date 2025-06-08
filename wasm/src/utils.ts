export function bytesToBase64(bytes: Uint8Array) {
    return btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));
}

export function base64ToBytes(base64: string) {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export function bytesToHex(bytes: Uint8Array) {
    return (
        '0x' +
        Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
    );
}

export function hexToBytes(hexStr: string) {
    if (hexStr.startsWith('0x')) {
        hexStr = hexStr.replace('0x', '');
    }
    if (hexStr.length % 2 !== 0) {
        hexStr = '0' + hexStr;
    }
    return Uint8Array.from((hexStr.match(/.{1,2}/g) as string[]).map((byte) => parseInt(byte, 16)));
}
