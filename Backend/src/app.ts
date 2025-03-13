import databaseInit from "./database"
import app from "./config"
import dotenv from "dotenv"

dotenv.config()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

try {
    await databaseInit()
    app.listen(port, () => {
        console.table({
            status: "Working",
            port: port,
            URL: `http://localhost:${port}`
        })
    })
} catch (error) {
    console.error("Unable to connect to the database:", error)
}

