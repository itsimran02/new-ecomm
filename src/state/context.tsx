import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  minPrice: number | "";
  setMinPrice: Dispatch<SetStateAction<number | "">>;
  maxPrice: number | "";
  setMaxPrice: Dispatch<SetStateAction<number | "">>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const FilterContext = createContext<
  FilterContextType | undefined
>(undefined);

const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [keyword, setKeyword] = useState("");

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
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
