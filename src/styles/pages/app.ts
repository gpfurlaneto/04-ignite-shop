import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
  overflow: "hidden",
  position: 'relative',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
})

export const Cart = styled('button', {
  cursor: 'pointer',
  position: 'relative',
  border: 0,
  padding: '0.75rem',
  borderRadius: 6,
  backgroundColor: '$gray800',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  marginLeft: 'auto',

  span: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '$green300',
    top: -6,
    right: -6,
    borderRadius: '100%',
    fontSize: '$xs',
    fontWeight: 'bold',
    color: '$white',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})


export const CartDrawerContainer = styled('div', {
  width: 480,
  height: '100%',
  backgroundColor: '$gray800',
  position: 'absolute',
  right: 0,
  transition: 'all 0.5s ease-in-out',
  display: "flex",
  flexDirection: 'column',
})

export const CloseCartDrawerButton = styled('button', {
  border: 0,
  cursor: "pointer",
  height: "fit-content",
  margin: '1.5rem',
  marginLeft: "auto",
  background: "transparent"
})

export const OrderContainer = styled('div', {
  padding: '0 3rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  h3: {
    fontSize: '$md',
    fontWeight: 'bold',
    paddingBottom: '2rem',
    lineHeight: '160%'
  }
})

export const OrderDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

export const OrderItem = styled('div', {
  display: 'flex',
  flexDirection: "row",
  gap: '1.25rem',

  img: {
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  },

  div: {
    display: 'flex',
    flexDirection: "column",

    h5: {
      fontWeight: 400,
      fontSize: '$md',
      lineHeight: '160%',
      color: '$gray300'
    },

    span: {
      fontWeight: 'bold',
      fontSize: '$md',
      lineHeight: '160%',
    },

    button: {
      width: 'fit-content',
      border: 0,
      background: 'transparent',
      fontWeight: 'bold',
      fontSize: '$sm',
      lineHeight: '160%',
      color: '$green300',
      mt: 6,
      cursor: 'pointer'
    }
  }
})

export const PriceContainer = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    margin: '3rem 0',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  }
})


export const Span = styled('span', {})
