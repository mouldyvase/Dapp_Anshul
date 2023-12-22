// app.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const truffleContract = require('truffle-contract');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(bodyParser.json());

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // Use Ganache's RPC URL

// Smart Contract ABI and Address
const contractArtifact = require('./client/public/contracts/Funder.json');
const { error } = require('console');

const Contract = truffleContract(contractArtifact);
Contract.setProvider(web3.currentProvider);

app.post('/api/login', async(req, res) => {
    console.log("login")
    try {
        
        
        const { Email, Password } = req.body;
         const accounts= await web3.eth.getAccounts();
         const Account=accounts[0];
         
        const instance = await Contract.deployed({from:Account});
        let result = await instance.getUser(Email, Password,{ from: Account });
        let owner=await instance.getOwner({from:Account});
        // await instance.usersCount.call((error, res) => {
        //     if (error) return console.log("try again");
        //     console.log(res);
        //   })
        console.log(result)
        if (!result) {
            console.log("Error :", error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.status(200).json({ status: "ok" });
        }
    }catch (error) {
    console.error('Error in adding new user', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
}
});

app.post('/api/signup', async (req, res) => {
    let token = null;
    try {
        const secretKey ="QWERTYUIOPLKJHGFDSAZXCVBNMLKJHGF";
         token=jwt.sign(req.body,secretKey);
        
        const { Email, Password, Firstname, Secondname, UserName,Account } = req.body;
         console.log(Account)
        const instance = await Contract.deployed({from:Account});
        let result = await instance.createUser(Email, Password, Firstname, Secondname, UserName,token,{ from: Account });
        await instance.usersCount.call((error, res) => {
            if (error) return console.log("try again");
            console.log(res);
          })
        
        if (!result) {
            console.log("Error :", error);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.header('auth-token', token).json({ success: true, message: 'User created successfully', token });        }
    }catch (error) {
    console.error('Error in adding new user', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
}
})

app.post('/api/registration',async(req,res)=>{
    try{
     const{index}=req.body
    }catch(error){
        console.error('Error in adding new user', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
