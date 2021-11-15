const express = require('express');

const logger = require('./utils/logger');
const app = express();
const port = 3000;
app.use(express.json());

let customers=[{
    "customerID":"12345",
    "customerName":"Hyma",
   " Age":"27",
    "Location":"nellore",
    "PhoneNumber":"9857462468"
},
{
    "customerID":"12346",
    "customerName":"Prathap",
   " Age":"25",
    "Location":"kota",
    "PhoneNumber":"7893536187",

},
{
    "customerID":"12347",
    "customerName":"Haritha",
   " Age":"22",
     "Location":"hyderabad",
    "PhoneNumber":"7660985681",

},
];
app.post('/customer',(req,res)=>{
    const customer=req.body;
    customers.push(customer);
    res.json({
        status:'added',
         result:customer
        })
        logger.info('customer added')
});

app.get('/customer',(req,res)=>{
    res.json({
        status:"success",
        result:customers
    })
    logger.info('all customers are visible');
});

app.get('/customer/:customerID',(req,res)=>{
    const customerID=req.params.customerID;
    for(let customer of customers){
        if(customer.customerID===customerID){
            res.json(customer);
            logger.info('we got particular customer details');
        }
    }
res.status(404).send('Customer is not found');
logger.error('Customer is not found');
});
app.put('/customer/:customerID',(req,res)=>{
    const customerID=req.params.customerID;
    const newCustomer=req.body;
    for(let i=0;i<customers.length;i++)
    {
        let customer=customers[i]
        if(customer.customerID===customerID){
            customers[i]=newCustomer;
        }
    }
    res.json(newCustomer);
    logger.info('customer updated successfully')
});
app.delete('/customer/:customerID',(req,res)=>{
    const customerID=req.params.customerID;
    for(i=0;i<customers.length;i++){
        let customer=customers[i]
        if(customer.customerID===customerID){
            customers.splice(i,1);
            
            res.send('Customer is deleted');
            logger.info ('customer is deleted') ; 
    }
}
res.status(404).send('customer id is not found');
logger.error('customer id is not found') ; 
});
app.listen(port, () => {
    console.log("Server started...");
    logger.info(`server is running on ${port}`)
})