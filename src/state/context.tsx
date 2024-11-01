import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Price = number | "";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  minPrice: Price;
  setMinPrice: (value: Price) => void;
  maxPrice: Price;
  setMaxPrice: (value: Price) => void;
  keyword: string;
  setKeyword: (value: string) => void;
}

const FilterContext = createContext<
  FilterContextType | undefined
>(undefined);

const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] =
    useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("");
  const [minPrice, setMinPrice] = useState<Price>("");
  const [maxPrice, setMaxPrice] = useState<Price>("");
  const [keyword, setKeyword] = useState<string>("");

  // Create a type-safe setter that ensures only number or "" is accepted
  const safeSetMinPrice = (value: Price) => {
    // Ensure only number or "" is set
    setMinPrice(value === "" ? "" : Number(value));
  };

  const safeSetMaxPrice = (value: Price) => {
    // Ensure only number or "" is set
    setMaxPrice(value === "" ? "" : Number(value));
  };

  const contextValue: FilterContextType = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice: safeSetMinPrice,
    maxPrice,
    setMaxPrice: safeSetMaxPrice,
    keyword,
    setKeyword,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within FilterContextProvider"
    );
  }
  return context;
};

export default FilterContextProvider;
