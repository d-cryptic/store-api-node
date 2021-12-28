const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "a";
  const products = await Product.find({
    // name: "vase table",
    // name: "albany sectional",
    // name: { $regex: search, $options: "i" },
  })
    .sort("-name price")
    .select("name price");
  //   throw new Error("testing async errors");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  //   console.log(req.query);

  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  console.log(queryObject);
  let result = Product.find(queryObject);

  if (sort) {
    // products = products.sort();
    // console.log(sort);
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
