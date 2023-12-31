import { Col, Container, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import useFetch from "../hooks/useFetch"

export function MyStore() {
  interface Items {
    id: string;
    name: string;
    price: number;
    imageName: string
  }

 const [data,error] = useFetch<Items[]>('user/product',[])
  
  return (
    <Container className="mt-4">
     <h1>Store</h1>
     {error &&  <div className="alert alert-danger" >
                {error}
          </div>}
      <Row md={2} xs={1} lg={3} className="g-3">
        {data?.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
        </Row> 
    </Container>
  )
}
