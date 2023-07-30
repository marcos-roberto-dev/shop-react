import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import axios from "axios";

import { stripe } from "@/lib/stripe";
import { formmateCurrencyBRL } from "@/utils/formatter";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { shoppingCartStore } from "@/store/shoppingCart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const add = shoppingCartStore((store) => store.add);

  function handleAddProductInShoppingCart() {
    add({ ...product, qnt: 1 });
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt={product.name}
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{formmateCurrencyBRL(product.price)}</span>

        <p>{product.description}</p>

        <button onClick={handleAddProductInShoppingCart}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  try {
    const productId = params.id;
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: price.unit_amount,
          description: product.description,
          defaultPriceId: price.id,
        },
      },
      revalidate: 60 * 60 * 1,
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
