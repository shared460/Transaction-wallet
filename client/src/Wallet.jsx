import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  
  
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp256k1.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Key
        <input placeholder="Type an Private Key " value={privateKey} onChange={onChange}></input>
      </label>

      <div style={{fontSize:'13px', color:'grey'}}>address : {address.slice(-20)}...</div>
      
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
