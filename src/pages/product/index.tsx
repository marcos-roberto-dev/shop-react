import { GetServerSideProps } from "next";

export default function Product() {
  return null;
}

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  if (!params) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
