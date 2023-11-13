import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: string
  quantity: number
  name: string,
  price: number
  imageName: string
}

export function CartItem({ id, quantity,name,imageName,price }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
         src={`http://localhost:8000/${imageName}`}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(price)}
        </div>
      </div>
      <div> {formatCurrency(price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  )
}
