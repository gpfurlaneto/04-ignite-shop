import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import logoImg from "../assets/logo.svg"
import { Cart, Container, Header } from "../styles/pages/app"

import Image from "next/future/image"
import MailIcon from "../assets/mail"
import { useCartStore } from "../lib/cartStore"
import { MouseEvent } from "react"
import { CardDrawer } from "../components/CartDrawer"
import Link from "next/link"
import { useRouter } from "next/router"

globalStyles()

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { items, toggleDrawer } = useCartStore()

  const handleCartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    toggleDrawer()
  }

  return (
    <Container>
      <Header>
        <Link href='/'><Image src={logoImg} alt="" /></Link>
        {router.pathname !== '/success' && <Cart onClick={handleCartClick}>
          <MailIcon color={items.length > 0 ? 'white' : undefined} />
          {items.length > 0 && <span>{items.length}</span>}
        </Cart>}
      </Header>

      <Component {...pageProps} />
      <CardDrawer />
    </Container >
  )
}

export default App
