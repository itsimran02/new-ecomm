import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useFilterContext } from "@/state/context";
import MainContent from "./MainContent";
import { Menu, X } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const SiderBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const {
    searchQuery,
    setSearchQuery,
    setKeyword,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useFilterContext();

  const [categories, setCategories] = useState<Category[]>(
    []
  );
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const handleReset = () => {
    setSearchQuery("");
    setKeyword("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data: Category[] = await res.json();
        const filterCato = data.slice(1, 5);
        setCategories(filterCato);
      } catch (error: unknown) {
        console.log("error fetching data", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          w-full lg:w-64 p-5 
          fixed lg:static 
          top-0 left-0 h-screen 
          transform transition-transform duration-300 
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0 
          overflow-y-auto 
          z-40 
          bg-white
        `}
      >
        <h1 className="text-lg font-bold mt-4 mb-10">
          React store
        </h1>
        <section>
          <Input
            placeholder="search for products"
            type="string"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="mb-4"
          />
          <div className="flex justify-center items-center mt-4 gap-2 mb-5">
            <Input
              type="number"
              placeholder="min"
              value={minPrice || ""}
              onChange={(e) =>
                setMinPrice(
                  e.target.value ? +e.target.value : ""
                )
              }
            />
            <Input
              type="number"
              placeholder="max"
              value={maxPrice || ""}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value ? +e.target.value : ""
                )
              }
            />
          </div>
          {/* categories section */}
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">
              Categories
            </h2>
            {categories.length > 0 ? (
              categories.map((cate, index) => (
                <Label
                  key={index}
                  className="mb-2 flex items-center"
                >
                  <Input
                    type="radio"
                    name="category"
                    value={cate.slug}
                    className="size-4 mr-2"
                    checked={selectedCategory === cate.slug}
                    onChange={() => {
                      setSelectedCategory(cate.slug);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                  <p>{cate.slug.toUpperCase()}</p>
                </Label>
              ))
            ) : (
              <p className="text-gray-500">
                No categories available
              </p>
            )}
          </div>
          {/* keywords */}
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">
              Keywords
            </h2>
            <div className="mt-5 mb-4">
              {keywords.map((keyword, index) => (
                <div key={index}>
                  <Button
                    className="bg-slate-100 hover:bg-slate-200 w-full mb-2 text-black"
                    onClick={() => {
                      setKeyword(keyword);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {keyword.toUpperCase()}
                  </Button>
                </div>
              ))}
              <Button
                className="w-full mt-2"
                onClick={handleReset}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </section>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <MainContent />
    </section>
  );
};

export default SiderBar;
