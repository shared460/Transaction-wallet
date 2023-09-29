const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());


const balances = {
  "02836889c0d08494fa407b1a9ce69fbfaaf7e57095b165ca5f16448ed43abf2ae0": 100,
  "032554f58386fc8c36d89fd4fa88ce4d8bc29ece006c0a318685bd1827da4ee75b": 50,
  "03b34c3c8df80a7146658988ff07f3686f23bd390ff611fe25fb3062b2bdd32307": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //TODo: get a signature from client side application
  //recover the public addreess from



  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
