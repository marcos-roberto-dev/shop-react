import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";

import { HomeContainer, Product } from "@/styles/pages/home";
import { stripe } from "@/lib/stripe";
import { formmateCurrencyBRL } from "@/utils/formatter";
import Link from "next/link";

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
              <strong>{product.name}</strong>
              <span>{formmateCurrencyBRL(product.price)}</span>
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
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
