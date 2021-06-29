var schedule = require('node-schedule');
const {Photo}=require('../model');

function scheduleCronstyle(){
    schedule.scheduleJob('30 * * * * *',async function(){
        const day=new Date().getDate()
        const arr=await Photo.find({})
        console.log(arr)
        // arr.map(img=>{
        //   console.log(img.date)
        // })
        // console.log('123')
    });
}

scheduleCronstyle();
