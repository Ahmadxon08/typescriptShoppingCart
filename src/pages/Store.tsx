import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import './../App.css'
;
import { StoreItem } from './../components/StoreItem';

const Store = () => {
  const [datas, setDatas] = useState([]);

  const fetchDatas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = res?.data;
      setDatas(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <Container>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        
          {datas &&
            datas.map((data) => {
              return (
                <Col key={data?.id} > 
                 <StoreItem {
                    ...data
                 } />
                </Col>
              );
            })}
        
      </Row>
    </Container>
  );
};

export default Store;
