import databaseInit from "./connection"

export default async () => { await databaseInit(process.env.CONNECTION_URL as string) }
