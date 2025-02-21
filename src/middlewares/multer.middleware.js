import multer, { diskStorage } from "multer";



// =================ye github sai liya h   link: (https://github.com/expressjs/multer) =====================

// or hum sai diskStorage mai save krange
const storage = multer.diskStorage({

    // req mai toh hume body mai json data mil gya ho hume express mai kya tha, aager file bhi aa rhe h toh esi liye multer use ho rha h (file), or callback jo hai he
    destination: function (req, file, cb) {

        // jaha saare file rakhne h vha ke location (./public/temp) or mai saare files public folder mai rakhunge taki easily access mil jaye saabhi files ka
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
 export const upload = multer({ 
    storage,
})