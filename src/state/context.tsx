import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (query: string) => void;
  minPrice: number | "";
  setMinPrice: (price: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (price: number | "") => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
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
  const [minPrice, setMinPrice] = useState<number | string>(
    ""
  );
  const [maxPrice, setMaxPrice] = useState<number | string>(
    ""
  );
  const [keyword, setKeyword] = useState<string>("");

  const stateData = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  };

  return (
    <FilterContext.Provider value={stateData}>
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
