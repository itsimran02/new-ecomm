import { useFilterContext } from "@/state/context";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import LoadingSkeleton from "./Loading";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
  rating: number;
  description: string;
}

const MainContent = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [allProducts, setProducts] = useState<Product[]>(
    []
  );

  const {
    searchQuery,
    keyword,
    minPrice,
    maxPrice,
    selectedCategory,
  } = useFilterContext();

  console.log(selectedCategory);
  console.log(keyword);
  console.log(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`;
      if (searchQuery) {
        url = `https://dummyjson.com/products/search?q=${searchQuery}`;
      } else if (keyword) {
        url = `https://dummyjson.com/products/search?q=${keyword}`;
      } else if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}`;
      }
      console.log(selectedCategory);
      try {
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, keyword, selectedCategory]);

  const getFilteredProducts = () => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (prod) => prod.category === selectedCategory
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(
        (prod) => prod.price >= +minPrice
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (prod) => prod.price <= +maxPrice
      );
    }

    return filtered;
  };

  const filteredProductList = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(
    totalProducts / itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  console.log(filteredProductList);
  return (
    <section className="flex-1">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-1 gap-2 md:gap-4 lg:gap-6">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map(
            (_, index) => <LoadingSkeleton key={index} />
          )
        ) : filteredProductList.length > 0 ? (
          filteredProductList.map((product, index) => (
            <div
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
              className="cursor-pointer rounded-md py-5 hover:scale-105 transition-all ease-out px-5 shadow-md hover:shadow-lg flex justify-center flex-col items-center"
              key={index}
            >
              <img
                src={product.thumbnail}
                className="w-full"
              />
              <div className="w-full mt-5">
                <h2 className="font-bold text-2xl text-start">
                  {product.title}
                </h2>
              </div>
              <div>
                <p>{product.description}</p>
              </div>
              <div className="flex justify-between w-full mt-5">
                <p className="font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-600">
                  rating {product.rating}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen w-full text-center">
            <h2 className="font-bold text-3xl py-5 px-5 mt-5 text-center">
              No products available
            </h2>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-5">
        <Button
          disabled={currentPage === 1}
          className="mx-2"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <TrackPreviousIcon /> Previous
        </Button>

        <Button
          disabled={currentPage === totalPages}
          className="mx-2"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <TrackNextIcon /> Next
        </Button>
      </div>
    </section>
  );
};

export default MainContent;
