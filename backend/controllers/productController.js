import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

//for adding product
const addProduct = async(req, res) => {
  try {
    const { 
      name, price, discounted_price, category, subCategory, 
      frameWidth, frameDimensions, frameColour, brand, 
      rating, reviews, sizes } = req.body

    //image uploads
    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4]. filter((item) => item !== undefined)

    const imageUrls = await Promise.all(
      images.map(async(item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url;  
      })
    )

    // parse the sizes and review_data if they are sent as json string
    const parsedSizes = sizes ? JSON.parse(sizes) : [];

    //creating product data
    const productData = {
      name,
      price,
      discounted_price, 
      category,
      subCategory,
      frameWidth,
      frameDimensions,
      frameColour,
      brand,
      rating,
      reviews,
      sizes: parsedSizes,
      image: imageUrls,
    }

    console.log(productData);
    
    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product Added" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

//for the product list
const listProducts = async(req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products })
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

//for removing products
const removeProduct = async(req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product removed" })
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
}

//single product info
const singleProduct = async(req, res) => {
  try {
    
    const { id } = req.body;
    if(!id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const product = await productModel.findById(id);

    if(!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { addProduct, listProducts, removeProduct, singleProduct }