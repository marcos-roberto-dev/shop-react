import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    marginTop: "5rem",
    display: "block",
    color: "$green500",
    fontSize: "$lg",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const calculateLeft = (index) => {
  return `calc(${index * -50}px)`;
};

export const ImageContainer = styled("div", {
  width: "8.75rem",
  height: "8.75rem",

  background: "linear-gradient(188deg, #1ea483 0%, #7465d4 100%)",
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100000px",
  marginTop: "4rem",
  boxShadow: "0px 0px 60px 0px rgba(0, 0, 0, 0.80)",
});

export const ImagesContainer = styled("div", {
  display: "flex",
  position: "relative",
});
