import type { AppProps } from "next/app";
import Image from "next/image";
import { Handbag, X } from "phosphor-react";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { GlobalStyles } from "@/styles/global";
import LogoImg from "@/assets/logo.svg";

import {
  ButtonClose,
  Container,
  Content,
  Header,
  ProductShoppingCart,
  ProductShoppingCartImage,
  ProductShoppingCartList,
  ProductShoppingCartSummary,
  ShoppingCartButton,
} from "@/styles/pages/app";
import { shoppingCartStore } from "@/store/shoppingCart";
import { formmateCurrencyBRL } from "@/utils/formatter";
import axios from "axios";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { qntShoppingCart, totalShoppingCart, cart } = shoppingCartStore(
    (store) => {
      store.getQntShoppingCart();
      return {
        qntShoppingCart: store.getQntShoppingCart(),
        totalShoppingCart: store.getTotalShoppingCart(),
        cart: store.cart,
      };
    }
  );

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const removeProductInShoppingCart = shoppingCartStore(
    (store) => store.remove
  );
  const products = shoppingCartStore((store) => store.cart);
  const [isShoppingCartModalOpen, setIsShoppingCartModalOpen] = useState(false);

  function handleShoppingCartModalOpenChange(value: boolean) {
    products.length
      ? setIsShoppingCartModalOpen(value)
      : setIsShoppingCartModalOpen(false);
  }

  async function buyProducts() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        cart,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreatingCheckoutSession(false);
    }
  }

  function handleCheckoutProducts() {
    buyProducts();
  }

  useEffect(() => {
    if (qntShoppingCart <= 0) {
      setIsShoppingCartModalOpen(false);
    }
  }, [qntShoppingCart]);

  return (
    <Container>
      <Header>
        <Image
          src={LogoImg.src}
          width={LogoImg.width}
          height={LogoImg.height}
          alt="Logo"
        />
        <Dialog.Root
          open={isShoppingCartModalOpen}
          onOpenChange={handleShoppingCartModalOpenChange}
        >
          <Dialog.Trigger asChild>
            <ShoppingCartButton>
              {qntShoppingCart > 0 && <span>{qntShoppingCart}</span>}

              <Handbag size={24} />
            </ShoppingCartButton>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Content>
              <header>
                <Dialog.Title>ShoppingCart</Dialog.Title>
                <ButtonClose>
                  <X size={24} />
                </ButtonClose>
              </header>
              <ProductShoppingCartList>
                {products.map((product) => (
                  <ProductShoppingCart key={product.id}>
                    <ProductShoppingCartImage>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={94}
                        height={94}
                      />
                    </ProductShoppingCartImage>
                    <div>
                      <div>
                        <h4>{product.name}</h4>
                        <p>
                          <strong>{formmateCurrencyBRL(product.price)}</strong>{" "}
                          <span>x {product.qnt}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeProductInShoppingCart(product.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </ProductShoppingCart>
                ))}
              </ProductShoppingCartList>
              <ProductShoppingCartSummary>
                <p>
                  <span>Qualidade</span> <span>{qntShoppingCart} items</span>
                </p>
                <p>
                  <strong>Valor total</strong>{" "}
                  <strong>{formmateCurrencyBRL(totalShoppingCart)}</strong>
                </p>
              </ProductShoppingCartSummary>
              <button onClick={handleCheckoutProducts}>Finalizar Compra</button>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
