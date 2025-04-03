import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./public/temp")
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*100000)
        cb(null,file.fieldname+"-"+uniqueSuffix)
    }
})
export const upload = multer({
    storage:storage,
})
