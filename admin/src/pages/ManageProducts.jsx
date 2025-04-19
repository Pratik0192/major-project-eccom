import AdminLayout from "../components/AdminLayout";
import { useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([
    {
      name: "RayBan Wayfarer",
      price: "₹3,999",
      discounted_price: "2500",
      category:"Sunglass",
      subCategory:"Pale Lenses",
      frameWidth:"30",
      frameDimensions:"Extra Wide",
      framecolor: "Black",
      brand:"Fossils",
      rating:"4.2",
      reviews:"Best",
      size: "Medium",
      stock: "In Stock",
    },
  ]);
  

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discounted_price: "",
    category:"",
    subCategory:"",
    frameWidth:"",
    frameDimensions:"",
    framecolor: "",
    brand:"",
    rating:"",
    reviews:"",
    size: "",
    stock: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const newProduct = { ...formData, stock: "In Stock" };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }

    setFormData({ name: "", price: "", discounted_price: "", category: "",
    subCategory: "", frameWidth: "", frameDimensions: "", framecolor: "", brand: "",
    rating: "", reviews: "", size: "", stock: "" });
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setFormData({ name: "", price: "", discounted_price: "", category: "",
      subCategory: "", frameWidth: "", frameDimensions: "", framecolor: "", brand: "", 
      rating: "", reviews: "", size: "", stock: "" });
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setFormData({
      name: product.name,
      price: product.price,
      discounted_price: product.discounted_price,
      category: product.category,
      subCategory: product.subCategory,
      frameWidth: product.frameWidth,
      frameDimensions: product.frameDimensions,
      framecolor: product.framecolor,
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews, 
      size: product.size,
      stock: product.stock,
    });
    setEditIndex(index);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Products</h2>

        {/* ➕ Add / ✏️ Edit Product Form */}
        <form
          onSubmit={handleAddOrUpdateProduct}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow mb-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="discounted_price"
            value={formData.discounted_price}
            onChange={handleChange}
            placeholder="Discounted Price"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="SubCategory"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="frameWidth"
            value={formData.frameWidth}
            onChange={handleChange}
            placeholder="Frame Width"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="frameDimensions"
            value={formData.frameDimensions}
            onChange={handleChange}
            placeholder="Frame Dimensions"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="framecolor"
            value={formData.framecolor}
            onChange={handleChange}
            placeholder="Frame Color"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            placeholder="Reviews"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
            <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="md:col-span-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          >
            {editIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* 🛍️ Product Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Discounted Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">SubCategory</th>
                <th className="py-3 px-4 text-left">Frame Width</th>
                <th className="py-3 px-4 text-left">Frame Dimensions</th>
                <th className="py-3 px-4 text-left">Frame Color</th>
                <th className="py-3 px-4 text-left">Brand</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Reviews</th>
                <th className="py-3 px-4 text-left">Size</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4"> {product.discounted_price}</td>
                    <td className="py-3 px-4"> {product.category}</td>
                    <td className="py-3 px-4"> {product.subCategory}</td>
                    <td className="py-3 px-4"> {product.frameWidth}</td>
                    <td className="py-3 px-4"> {product.frameDimensions}</td>
                    <td className="py-3 px-4">{product.framecolor}</td>
                    <td className="py-3 px-4">{product.brand}</td>
                    <td className="py-3 px-4">{product.rating}</td>
                    <td className="py-3 px-4">{product.reviews}</td>
                    <td className="py-3 px-4">{product.size}</td>
                    <td className="py-3 px-4 text-green-600">{product.stock}</td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;
