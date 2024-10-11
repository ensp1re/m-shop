export const revalidate = 0;

import Container from "@/app/components/container";
import HomeBanner from "@/app/components/HomeBanner/HomeBanner";
import { products } from "@/utils/products";
import ProductCard from "@/app/components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import { Product } from "@prisma/client";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const productsFromDatabase = await getProducts(searchParams);

  if (productsFromDatabase.length === 0) {
    return <NullData title="No products in database" />;
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i * 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const allProducts: Product[] = [...products, ...productsFromDatabase];

  const shuffledPropucts = shuffleArray(allProducts);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5
                                2xl:grid-cols-6 gap-8"
        >
          {shuffledPropucts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
