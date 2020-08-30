import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  ButtonGroup,
} from "reactstrap";
import api from "../../services/api";

const Dashboard = ({history}) => {
  const [events, setEvents] = useState([]);
  const user_id = localStorage.getItem("user");
//    const [cSelected, setCSelected] = useState([]);
	const [rSelected, setSelected] = useState(null);
  useEffect(() => {
    getEvents();
  }, []);

 const filterHandler=(query)=>{
	 setSelected(query)
	 getEvents(query)
 }
  
 const myEventsHandlers=(query)=>{
  setSelected("myEvents")
 }

  const getEvents = async (filter) => {
    const url = filter ? `/dashboard/${filter}` : "/dashboard";
    const response = await api.get(url, { headers: { user_id } });
    setEvents(response.data);
  };
  console.log("list ", events);
  return (
    <Fragment>
      <Container>
		<ButtonGroup>
				<Button color="primary" onClick={() => filterHandler(null)} active={rSelected===null}>All Sports</Button>
				<Button color="primary" onClick={() => filterHandler("remeras")} active={rSelected==="remeras"}>remeras</Button>
				<Button color="primary" onClick={() => filterHandler("pantalones")} active={rSelected==="pantalones"}>pantalones</Button>
				<Button color="primary" onClick={() => filterHandler("camisas")} active={rSelected==="camisas"}>camisas</Button>
        <Button color="primary" onClick={() => myEventsHandlers("camisas")} active={rSelected==="myEvents"}>my event</Button>
				<Button color="secondary" onClick={()=>history.push("event")}>Events</Button>
		</ButtonGroup>
		 
        <Row>
          {events.map((event) => {
            return (
              <Col key={event._id} sm="3">
                <Card style={{marginBottom:"15px"}}>
                  <CardImg
                    top
                    width="100%"
                    style={{diplay:"block"}}
                    src={event.thumbnail_url}
                    alt={event.title}/>
                  <CardBody>
                    <CardTitle>{event.title}</CardTitle>
                    <CardSubtitle>
                      {parseFloat(event.price).toFixed(2)}
                    </CardSubtitle>
                    <CardText>{event.description}</CardText>
					<CardText>{event.sport}</CardText>
                    <CardText>{moment(event.date).format("L")}</CardText>
                    <Button color="primary" style={{width:"100%"}}>Pay</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
