import { styled } from "@/styles";
import * as Dialog from "@radix-ui/react-dialog";
export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  // justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ShoppingCartButton = styled("button", {
  border: "none",
  background: "$gray800",
  color: "$gray300",
  padding: "0.75rem",
  borderRadius: "6px",
  cursor: "pointer",
  position: "relative",
  variants: {
    product: {
      true: {
        background: "$green500",
      },
    },
  },

  span: {
    position: "absolute",
    width: "1.6rem",
    height: "1.6rem",
    background: "$green500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10000,
    top: "-0.3rem",
    right: "-0.5rem",
    border: "2px solid $gray900",
    color: "$white",
  },
});

export const Content = styled(Dialog.Content, {
  height: "100vh",
  width: "30rem",
  background: "$gray800",
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  padding: "0 3rem 3rem",
  display: "flex",
  flexDirection: "column",
  zIndex: 9999,
  overflow: "auto",

  header: {
    position: "sticky",
    top: 0,
    background: "$gray800",
    paddingBottom: "2rem",
    paddingTop: "3rem",
  },

  ["& > button"]: {
    marginTop: "3.5625rem",
    padding: "1.25rem",
    borderRadius: 8,
    cursor: "pointer",
    background: "$green500",
    color: "$white",
    fontWeight: "bold",
    fontSize: "1rem",
    border: "none",
  },
});

export const ProductShoppingCart = styled("li", {
  display: "flex",
  gap: "1.25rem",
  ["& div:last-child"]: {
    width: "100%",
  },
  ["& > div"]: {
    display: "flex",
    gap: "0.5rem",
    flexDirection: "column",
    lineHeight: "1.6",

    div: {
      width: "100%",
      flex: 1,
      fontSize: "1.125rem",
      h4: {
        color: "$gray300",
        fontWeight: "normal",
      },
      p: {
        display: "flex",
        justifyContent: "space-between",
      },
    },

    button: {
      background: "transparent",
      border: "none",
      color: "$green500",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
    },
  },
});

export const ProductShoppingCartList = styled("ul", {
  listStyle: "none",
  flex: "1",
  gap: "1.5rem",
  display: "flex",
  flexDirection: "column",
});

export const ProductShoppingCartImage = styled("div", {
  background: "linear-gradient(188deg, #1ea483 0%, #7465d4 100%)",
  width: "6.37125rem",
  height: "6rem",
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  img: {
    objectFit: "cover",
  },
});

export const ButtonClose = styled(Dialog.Close, {
  position: "absolute",
  right: "-2rem",
  top: "1.5rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "$gray300",
});

export const ProductShoppingCartSummary = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  p: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "$gray300",
  },

  ["p:last-child"]: {
    color: "$white",
    fontSize: "1.125rem",
    ["strong:last-child"]: {
      fontSize: "1.5rem",
    },
  },
});
