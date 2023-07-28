import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  SuccessContainer,
  ImagesContainer,
  calculateLeft,
} from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
interface SuccessProps {
  customerName: string;
  products: any[];
}

export default function Success({
  customerName,
  products: productsApi,
}: SuccessProps) {
  const qnt = productsApi.reduce((act, product) => {
    return act + product.quantity;
  }, 0);
  const products = productsApi.map((productAPI) => {
    const product = productAPI.price.product as Stripe.Product;
    return {
      imageUrl: product.images[0],
      name: product.name,
    };
  });
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImagesContainer css={products.length > 1 && { left: 50 }}>
        {products.map((product, index) => (
          <ImageContainer
            key={product.name}
            css={{ position: "relative", left: calculateLeft(index) }}
          >
            <Image
              src={product.imageUrl}
              width={120}
              height={110}
              alt={product.name}
            />
          </ImageContainer>
        ))}
      </ImagesContainer>
      {qnt === 1 ? (
        <p>
          Uhuul <strong>{customerName}</strong>, sua{" "}
          <strong>{products[0].name}</strong> já está a caminho da sua casa.
        </p>
      ) : (
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {qnt} camisetas
          já esta a caminho da sua casa.
        </p>
      )}

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;

  return {
    props: {
      customerName,
      products: session.line_items.data,
    },
  };
};
