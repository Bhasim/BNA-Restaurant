import datas from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import Order from "../models/order.js";
import sgMail from "@sendgrid/mail";
import * as path from 'path';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, type, ing, price, quantity, rate } = req.fields;
    const { img } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case img && img.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
      case !price:
        return res.json({ error: "Price is required" });
      case !type:
        return res.json({ error: "Category is required" });
      case !ing:
        return res.json({ error: "Description is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !rate:
        return res.json({ error: "rate is required" });
    }

    // create product
    const product = new datas({ ...req.fields });

    if (img) {
      img = fs.readFileSync(img);
      //product.img.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await datas
      .find({})
     
      
      .limit(80)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    console.log(req.params);
    const product = await datas
      .findById(req.params.productId)
      .select("-img")
     

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await datas.findById(req.params.productId)
    console.log(product);
    if (product.img) {
      res.set("img", product.img);
      return res.sendFile(path.join("/uploads/"))
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await datas
      .findByIdAndDelete(req.params.productId)
      .select("-photo");
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, type, ing, price, quantity, rate,img } = req.fields;
   //const { img } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case img && img.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
      case !price:
        return res.json({ error: "Price is required" });
      case !type:
        return res.json({ error: "Category is required" });
      case !ing:
        return res.json({ error: "Description is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !rate:
        return res.json({ error: "rate is required" });
    }

    // update product
    let product = await datas.findByIdAndUpdate(
      req.params.productId,req.fields,
      
    );
    

    if (img) {
      //product.img.datas = fs.readFileSync(img.path);
      product.img = img;
    }

    //await product;
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};



export const productsCount = async (req, res) => {
  try {
    const total = await datas.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;

    const products = await datas
      .find({})
      
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};





export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
     console.log(req.body);
    const { nonce, cart } = req.body;
 
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
     console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
       
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          // create order
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
           
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};



export const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");
    // send email

    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};
