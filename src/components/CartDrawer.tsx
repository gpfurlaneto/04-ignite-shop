import Image from "next/image";
import { CartDrawerContainer, CloseCartDrawerButton, OrderDetails, OrderItem, OrderContainer, PriceContainer, Span } from "../styles/pages/app";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useCartStore } from "../lib/cartStore";
import closeImg from '../assets/close.svg'
import axios from "axios";
import { useState } from "react";

export function CardDrawer() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const { total, items, showDrawer, toggleDrawer, removeItem } = useCartStore()

  const ref = useOutsideClick(() => {
    if (showDrawer) {
      toggleDrawer()
    }
  });

  const handlePurchase = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceIds: items.map(item => item.defaultPriceId),
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartDrawerContainer ref={ref} css={{
      transform: `translateX(${showDrawer ? '0%' : '100%'})`,
    }}>
      <CloseCartDrawerButton onClick={toggleDrawer}>
        <Image src={closeImg} alt='' />
      </CloseCartDrawerButton>
      <OrderContainer>
        <h3>Sacola de compras</h3>
        <OrderDetails>
          {items.map(item => (
            <OrderItem key={item.id}>
              <Image src={item.imageUrl} width={102} height={92} alt='' />
              <div>
                <h5>{item.name}</h5>
                <span>{item.price}</span>
                <button onClick={() => removeItem(item.id)}>Remover</button>
              </div>
            </OrderItem>
          ))}
        </OrderDetails>
        <PriceContainer>
          <div>
            <Span css={{ fontSize: '$sm' }}>Quantidade</Span>
            <Span css={{ fontSize: '$md' }}>{items.length} Itens</Span>
          </div>
          <div>
            <Span css={{ fontWeight: 'bold', fontSize: '$md' }}>Valor Toral</Span>
            <Span css={{ fontWeight: 'bold', fontSize: '$xl' }}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total / 100)}
            </Span>
          </div>
          <button disabled={isCreatingCheckoutSession} onClick={handlePurchase}>Finalizar Compra</button>
        </PriceContainer>
      </OrderContainer>
    </CartDrawerContainer>
  )
}