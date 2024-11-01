import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

interface Product {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  brand: string;
  stock: number;
  images: string[];
  category: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | null
  >(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-yellow-500"
            : "text-gray-300"
        }`}
        fill={
          index < Math.floor(rating)
            ? "currentColor"
            : "none"
        }
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin">
          <AlertCircle className="w-12 h-12 text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No product found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} thumbnail ${
                  index + 1
                }`}
                className={`w-16 h-16 object-cover rounded cursor-pointer ${
                  selectedImage === image
                    ? "border-2 border-blue-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">
              {product.brand} | {product.category}
            </p>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-4xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <p className="text-green-600 font-medium">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Product Description
            </h2>
            `1
            <p className="text-gray-700">
              {product.description}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
