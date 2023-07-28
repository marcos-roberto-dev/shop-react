import { styled } from "@/styles";

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
