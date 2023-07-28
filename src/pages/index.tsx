import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import { HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";
import { formmateCurrencyBRL } from "@/utils/formatter";
import Link from "next/link";
import { ShoppingCartButton } from "@/styles/pages/app";
import { MouseEvent } from "react";
import { shoppingCartStore } from "@/store/shoppingCart";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}
interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  const add = shoppingCartStore((store) => store.add);

  function handleAddProductInShoppingCart(event: MouseEvent, product: any) {
    event.preventDefault();
    add({ ...product, qnt: 1 });
  }

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
          <Product className="keen-slider__slide">
            <Image
              placeholder={"blur"}
              blurDataURL={product.imageUrl}
              src={product.imageUrl}
              width={520}
              height={520}
              alt={product.name}
            />
            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{formmateCurrencyBRL(product.price)}</span>
              </div>
              <ShoppingCartButton
                product
                onClick={(event) =>
                  handleAddProductInShoppingCart(event, product)
                }
              >
                <Handbag size={24} />
              </ShoppingCartButton>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
