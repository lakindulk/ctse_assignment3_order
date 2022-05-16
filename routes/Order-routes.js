const router = require("express").Router();
let Order = require("../models/Order-model");

router.route("/").post((req,res)=>{
    const buyerID = req.body.buyerID;
    const productname = req.body.productname;
    const price=req.body.price;
    const deliveryAddress=req.body.deliveryAddress;
    const cardnumber=req.body.cardnumber;

    const newOrder= new Order({

        buyerID,
        productname,
        price,
        deliveryAddress,
        cardnumber
    })
    newOrder.save().then(()=>{
        res.json("Order details Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/:id").put(async (req,res) => {
    let userId = req.params.id;
    const {buyerID, productname,price,deliveryAddress,cardnumber} = req.body;

    const updateOrder = {
        buyerID,
        productname,
        price,
        deliveryAddress,
        cardnumber
    }
    const update = await  Order.findByIdAndUpdate(userId, updateOrder)
    .then(() => {
        res.status(200).send({status: "Order Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.messege});
    })
})


router.route("/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Order.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "Order deleted"});
    }).catch((errr) => {
        console.log(err.messege);
        res.status(500).send({status: "Error with delete order", error: err.messege});
    })
})

router.route("/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Order.findById(userId)
    .then((order) => {
        res.status(200).send({status: "Single Order details fetched", order})
    }).catch(() => {
        console.log(err.messege);
        res.status(500).send({status: "Error with get Order",error: err.messege});
    })
})
module.exports = router;