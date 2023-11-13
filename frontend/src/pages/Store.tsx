import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import useFetch from "../hooks/useFetch"

export function Store() {
  interface Items {
    id: string;
    name: string;
    price: number;
    imageName: string
  }

 const data = useFetch({url : '/user/product'})  as Items[]
  
  if(data == null) return null

  return (
    <>
     <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {data.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
        </Row> 
    </>
  )
}
