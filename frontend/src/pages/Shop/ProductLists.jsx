import { useEffect, useState } from "react";
import ProductServices from "../../services/product.service";
import Card from "../../components/Card";

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await ProductServices.getAllProducts();
      console.log(res);
      setProducts(res.data);
      setCategories(["all", ...new Set(res.data.map((item) => item.category))]);
      setFilteredItems(res.data);
    };
    fetchData();
  }, []);

  const filterItem = (category) => {
    setSelectedCategory(category);
    handleSortChange(sortOption, filteredItems);
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItem = [...products];
    switch (option) {
      case "a-z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItem.sort((a, b) => a.price - b.price);
        break;
    }
    setFilteredItems(sortedItem);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="section-container py-6">
      <div className="flex flex-col md:flex-row flex-wrap items-center md:justify-between space-y-3 mb-8">
        {/* Categories */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {categories.map((category, index) => {
            return (
              <button
                onClick={() => filterItem(category)}
                key={index}
                className={`btn btn-ghost ${
                  selectedCategory === category
                    ? "text-red underline-offset-4 underline"
                    : ""
                }`}
              >
                <p className="capitalize">{category}</p>
              </button>
            );
          })}
        </div>
        {/* Sort options */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <select
              onChange={(e) => handleSortChange(e.target.value, filteredItems)}
              name="sortOptions"
              id="sortOptions"
              className="bg-black text-white px-2 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/* Product lists */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.length > 0 &&
            currentItems.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            onClick={() => paginate(index + 1)}
            key={index}
            className={`mx-1 btn btn-ghost ${
              currentPage === index + 1 ? "bg-red text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductLists;
