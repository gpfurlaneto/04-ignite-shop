import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageBackground, ImageContainer, SuccessContainer } from "../styles/pages/success";
import { useEffect } from "react";
import { useCartStore } from "../lib/cartStore";

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ costumerName, products }: SuccessProps) {

  const { resetCart } = useCartStore()
  useEffect(() => {
    resetCart()
  }, [resetCart]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImageContainer>
          {products.map(product => (
            <ImageBackground key={product.name}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageBackground>
          ))}
        </ImageContainer>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua {products.length} camiseta{products.length > 0 ? 's' : ''} já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const costumerName = session.customer_details.name;
  const products = session.line_items.data.map(({ price }: Stripe.LineItem) => {
    const product = price.product as Stripe.Product;
    return ({
      name: product.name,
      imageUrl: product.images[0]
    })
  })

  return {
    props: {
      costumerName,
      products
    }
  }
}
