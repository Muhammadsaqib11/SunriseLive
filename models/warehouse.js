const mongoose = require("../config/config");

const warehouse_schema = mongoose.Schema(
  {
    name: String,
    location: String,
    no: Number,
  },
  { timestamps: true }
);

// const Warehouses = mongoose.model('Warehouses',warehouse_schema);
const Warehouse = mongoose.model('Warehouse',warehouse_schema)

module.exports = Warehouse;
