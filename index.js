import {Server} from "socket.io"
import http from "http"
// const io = new Server(3002)
import express from "express"
import mongoose from "mongoose"
//import { Reciepe } from "./reciepes.js"
import morgan from "morgan"
//import  reciepe  from "./reciepes.js"
import reciepes from "./models/product.js"
import authRoutes from "./routes/auth.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import userSchema from "./models/user.js"
import {Chat} from "./Chat.js"
import { Chef } from "./Chef.js"
import {SelectedUser} from "./SelectedUserId.js"
import { Special } from "./special.js"

import "dotenv/config"
import cors from "cors"
import multer from "multer"

//! ===================== Deploy ================

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//! =======================================
let upload = multer({
  dest:"./uploads"
})  



let app = express()
app.use(express.json())
app.use("/img", express.static("./images"));
app.use("/uploads", express.static("./uploads"));
app.use(cors())




// io.on("connection", (socket) => {

//   socket.on("client sends message", (msg) => {
//     socket.broadcast.emit("server sends message from client to admin", {
//       message: msg, 
//    })
     
//   })
//   socket.on("admin sends message", ({ message }) => {
//     socket.broadcast.emit("server sends message from admin to client", message);
// })
// })

app.listen(process.env.PORT || 4500)
mongoose.connect(process.env.MONGO)
// ================================= Reciepies =================
app.get("/getReciepes",(req, res) => {
  reciepes.find().then(result => res.json(result))
})

// =============================== Specials ========================
app.post("/api/special/:id",upload.single("image"), async (req, res) => {
  let {meal,price,tel,type,showAll,description,address,chefName} = req.body
  await Special.create({
    meal,
    price,
    tel,
    type,
    image: `/uploads/${req.file.filename}`,
    userId: req.params.id,
    showAll,
    description,
    address,
    chefName
  }).then(result => res.json(result))
})

app.get("/api/getSpecial",async (req, res) => {
  await Special.find().then(result => res.json(result))
})

app.delete("/api/deleteSpecial/:id", async (req, res) => {
  await Special.findByIdAndDelete({"_id":req.params.id},req.body).then(result => res.json(result))
})

app.get("/api/users", async (req, res) => {
  await userSchema.find().then(result => res.json(result))
})

app.put("/api/update/:id", async (req, res) => {
  await userSchema.findByIdAndUpdate({"_id":req.params.id},req.body).then(result => res.json(result))
})

app.get("/api/getChat", async (req, res) => {
  await Chat.find().then(result => res.json(result))
})
// app.put("/updateChat/:id", async (req, res) => {
//   let chatContent = {
//     input: req.body.input,
//     room: req.body.room,
//     signedIn:req.body.signedIn
//   }
//   await Chat.findByIdAndUpdate(req.params.id, {
//     $push:{chat:chatContent}
//   }).then(result => res.json(result))
// })

// app.post("/posting", async (req, res) => {
//   await Chat.create({
//     chat:req.body.chat
//   }).then(result => res.json(result))
// })

// app.post("/chef",async (req, res) => {
//   await Chef.create({
//     isOnline:false
//   }).then(result => res.json(result))
// })

// app.put("/updateChef",async (req, res) => {
//   await Chef.findByIdAndUpdate("639469c36fdf4c6f6bc4489d",req.body).then(result => res.json(result))
// })
app.put("/api/chefOnline",async (req, res) => {
  await Chef.findByIdAndUpdate("639469c36fdf4c6f6bc4489d", {
    $set:{isOnline:true}
  })
})
app.put("/api/chefOffline",async (req, res) => {
  await Chef.findByIdAndUpdate("639469c36fdf4c6f6bc4489d", {
    $set:{isOnline:false}
  })
})
app.get("/api/getIsChefOnline", async(req, res) => {
  await Chef.find().then(result => res.json(result))
})

// app.post("/selectedUserId",async (req, res) => {
//   await SelectedUser.create({
//     selectedUserId:req.body.selectedUserId
//   }).then(result => res.json(result))
// })

app.put("/api/updateSelectedUserId", async (req, res) => {
  await SelectedUser.findByIdAndUpdate("6394855e0539389326a52b2f",req.body).then(result => res.json(result))
})


app.get("/api/getSelectedUserId",async (req, res) => {
  await SelectedUser.find().then(result => res.json(result))
})

app.put("/api/deleteChat",async (req, res) => {
  await Chat.findByIdAndUpdate("6394676f303ff0e99efa3c30", {
    $set:{chat:[]}
  })
})





app.use((error, req, res, next) => {
     console.error(error);
     next(error);
   });
   app.use((error, req, res, next) => {
     res.status(500).json({
       message: error.message,
       stack: error.stack,
     });
   });

   // middlewares

   app.use(morgan("dev"))
   //router middleware
   app.use("/api",authRoutes)
   app.use("/api",categoryRoutes)
   app.use("/api",productRoutes)

//! ======================== deploy ==========
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
//! =======================

// ==================================== Socket ==========================
let server = http.createServer(app)
let io = new Server(server, {
    cors: {
        origin:"http://localhost:3000" // the frontend localhost
    }
})
// let socketConnected = []

server.listen(5000, () => {
    console.log("server is running !");
})
io.on("connection", (socket) => {
  // console.log("Socket", socket);
  // socketConnected.push({userId:socket.id})
  // socket.connected[socket.id].emit("sendMessage","hello")
  socket.on("join-room", (data) => {
    socket.join(data)
    console.log("From join room", data);
    
  })


  socket.on("send-message",async (data) => {
    socket.to(data.room).emit("receive-message", data)
    console.log(data);
    // await Chat.create({input:data.input})
    await Chat.findByIdAndUpdate("6394676f303ff0e99efa3c30", {
      $push:{chat:data}
    })
  })
})
