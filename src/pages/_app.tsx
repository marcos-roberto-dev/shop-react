import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import LogoImg from "@/assets/logo.svg";
import Image from "next/image";
import { Container, Header, ShoppingCartButton } from "@/styles/pages/app";
import { Handbag } from "phosphor-react";
import { shoppingCartStore } from "@/store/shoppingCart";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const qntShoppingCart = shoppingCartStore((store) =>
    store.getQntShoppingCart()
  );
  return (
    <Container>
      <Header>
        <Image
          src={LogoImg.src}
          width={LogoImg.width}
          height={LogoImg.height}
          alt="Logo"
        />

        <ShoppingCartButton>
          {qntShoppingCart > 0 && <span>{qntShoppingCart}</span>}

          <Handbag size={24} />
        </ShoppingCartButton>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
