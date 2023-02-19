const mongoose = require("mongoose");
const validator = require("validator");
const productSchema = new mongoose.Schema({

  name: { type: String, trim: true, unique: true, required: true },
  category: { type: String, enum: ["Men", "Women", "Kids"], required: true },
  brand: { type: String, trim: true, required: true },
  // color: [{ type: String, trim: true ,required: true}],
  colors:[{
    color:{required: true, unique: true,type: String, trim: true},
    quantity:{type:Number,trim: true,required: true,
      validate(value) {
        if (!validator.isInt(value.toString())) throw new Error("invalid Color Quantity");
      },}
  }],

  price: {
    type: Number,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isInt(value.toString())) throw new Error("invalid Price");
    },
  },

  stock: {
    type: Number,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isInt(value.toString())) throw new Error("invalid Stock");
    },
  },
  // stock: {
  //   type: String,
  //   trim: true,
  //   required: true,
  //   validate(value) {
  //     if (!validator.isInt(value)) throw new Error("invalid stock");
  //   },
  // },

  image: 
  { type: String, 
    required: true,
  },
});

productSchema.methods.toJSON = function () {
  var productdata = this.toObject();
  deleteItems = ["__v"];
  deleteItems.forEach((item) => {
    delete productdata[item];
  });
  return productdata;
};

productSchema.virtual("productOrder",{
  // ref:'orders',
  ref:'cart',
  localField:'_id',
  foreignField:'products_id'
})

const product = new mongoose.model("products", productSchema);
module.exports = product;
