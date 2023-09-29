const { secp256k1 }  = require("ethereum-cryptography/secp256k1.js")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils.js")

const private_key = secp256k1.utils.randomPrivateKey();
const public_key = secp256k1.getPublicKey(private_key); 

//private key is conveted into hexadecimal format
console.log("PrivateKey : ",toHex(private_key))



console.log("PublicKey : ",toHex(public_key))
