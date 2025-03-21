import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${path.join(__dirname+"../"+"../"+"../")}/public`)
    },
    filename: (req, file, cb) => {        
        cb(null, `${Date.now()}.` + file.originalname.split(".")[file.originalname.split(".").length - 1])
    },
})
export const upload = multer({ storage })
