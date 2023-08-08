`use strict`
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000

const countConnet = () => {
    const numConnect = mongoose.connections.length
    console.log(`number of connection ${numConnect}`)
}

//check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length
        const numCore = os.cpus().length
        const memoryUse = process.memoryUsage().rss
        const maxConnect = numCore * 5

        console.log(`num connection ${numConnect}`)
        console.log(`memory usage ${memoryUse/1024/1024 } MB`)
        if(numConnect > maxConnect){
            console.log('number connection overload, nâng cấp ngay')
        }
    }, _SECOND)
}

module.exports = {
    countConnet,
    checkOverload
}