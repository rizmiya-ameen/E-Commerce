import { products } from "@/utils/products";
import Container from "@/components/Container";
import ProductCard from "@/components/products/ProductCard";
import HomeBanner from "@/components/HomeBanner";
import NullData from "@/components/NullData";

interface HomeProps {
  searchParams: {
    category?: string;
    searchTerm?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const category = searchParams.category;
  const searchTerm = searchParams.searchTerm?.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    if (searchTerm) {
      const haystack = `${product.name} ${product.brand} ${product.description}`.toLowerCase();
      return haystack.includes(searchTerm);
    }

    return true;
  });

  const isFiltered = Boolean(category || searchTerm);

  return (
    <div className="p-8">
      <Container>
        {!isFiltered && <HomeBanner />}

        {isFiltered && (
          <p className="mb-6 text-sm text-slate-500">
            {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}
            {searchParams.searchTerm && <> for &ldquo;{searchParams.searchTerm}&rdquo;</>}
            {category && <> in {category}</>}
          </p>
        )}

        {filteredProducts.length === 0 ? (
          <NullData title="No products found. Try a different search or category." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {filteredProducts.map((product) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
