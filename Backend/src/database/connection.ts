import mongoose from "mongoose"

async function databaseInit(connectionUrl: string) {

    console.log(connectionUrl)
    await mongoose.connect(connectionUrl)
}

export default databaseInit