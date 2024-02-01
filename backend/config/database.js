const mongoose =require('mongoose')


const connectDatabase =()=>{
    mongoose.connect('mongodb+srv://paritoshpardeshi35:ksIwimVdcCXlFxD4@cluster0.qoagclq.mongodb.net/').then((data)=>{
        console.log("mongodb connected ");
    }).catch((err)=> {
    console.log("errr",err);
    })
    
}

module.exports = connectDatabase