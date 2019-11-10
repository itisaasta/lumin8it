import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Switch from "react-bootstrap/Switch";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { withRouter } from "react-router-dom";
import { CompactPicker } from "react-color";
import { Context as AuthContext } from "../context/AuthContext";

function AddProgram(props) {
  const { state } = useContext(AuthContext);
  console.log("PAGE USERNAME: " + state.username);

  const [measurementtype, setMeasurementtype] = useState("");
  const [lightbehavior, setLightbehavior] = useState("");
  const [color1, setColor1] = useState("");
  const [buttonactive1, setButtonactive1] = useState(false);
  const [color2, setColor2] = useState("");
  const [buttonactive2, setButtonactive2] = useState(false);
  const [color3, setColor3] = useState("");
  const [buttonactive3, setButtonactive3] = useState(false);
  const [toggleactive, setToggleactive] = useState(false);
  const [lightsnumber, setLightsnumber] = useState(null);

  const [product, setProduct] = useState({
    _id: "",
    prod_name: "",
    prod_desc: "",
    prod_price: 0,
    color: "#fff"
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/v1/products";

  const saveProduct = e => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      prod_name: product.prod_name,
      prod_desc: product.prod_desc,
      prod_price: parseInt(product.prod_price)
    };
    axios
      .post(apiUrl, data)
      .then(result => {
        setShowLoading(false);
        props.history.push("/show/" + result.data._id);
      })
      .catch(error => setShowLoading(false));
  };

  const onChange = e => {
    e.persist();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeComplete = color => {
    setProduct({ ...product, color: color.hex });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <Form onSubmit={saveProduct}>
          <Form.Group>
            <Form.Label>Measurement Type</Form.Label>
            <ButtonToolbar>
          <Button onClick = {() => setMeasurementtype("acceleration")} variant="outline-*"> <i class="fas fa-running"></i> </Button>
          <Button onClick = {() => setMeasurementtype("pressure")} variant="outline-*"> <i class="fas fa-cookie"></i> </Button>
          <Button onClick = {() => setMeasurementtype("sound")} variant="outline-*"> <i class="fas fa-volume-up"></i> </Button>
          <Button onClick = {() => setMeasurementtype("uv")} variant="outline-*"> <i class="fas fa-sun"></i> </Button>
          <Button onClick = {() => setMeasurementtype("air")} variant="outline-*"> <i class="fas fa-wind"></i> </Button>
          </ButtonToolbar>

          <Form.Label>Light Behavior</Form.Label>
          <ButtonToolbar>
          <Button onClick = {() => setLightbehavior("scroll")} variant="outline-*"> <i class="fas fa-lightbulb"></i> </Button>
          <Button onClick = {() => setLightbehavior("blink")} variant="outline-*"> <i class="fas fa-star"></i> </Button>
          <Button onClick = {() => setLightbehavior("wipe")} variant="outline-*"> <i class="fas fa-arrow-alt-circle-right"></i> </Button>
          <Button onClick = {() => setLightbehavior("solid")} variant="outline-*"> <i class="fas fa-square"></i> </Button>
          <Button onClick = {() => setLightbehavior("rainbow")} variant="outline-*"> <i class="fas fa-rainbow"></i> </Button>
          </ButtonToolbar>
          
          <Form.Label>Pick 3 Colors </Form.Label>
          <ButtonToolbar> 
          <Button variant="outline-*" onClick = {() => {setButtonactive1(!buttonactive1); setButtonactive2(false); setButtonactive3(false)}}> Color 1 </Button>
          <Button variant="outline-*" onClick = {() => {setButtonactive2(!buttonactive2); setButtonactive1(false); setButtonactive3(false)}}> Color 2 </Button>
          <Button variant="outline-*" onClick = {() => {setButtonactive3(!buttonactive3); setButtonactive1(false); setButtonactive2(false)}}> Color 3 </Button>
          </ButtonToolbar>

          <Row> 
          {buttonactive1 ? 
          <CompactPicker
              color={color1}
              onChangeComplete={(color) => {
                setColor1(color.hex)
                setButtonactive1(color.hex)
              }}
            /> : null}
            </Row>

            <Row> 
          {buttonactive2 ? 
          <CompactPicker
              color={color2}
              onChangeComplete={(color) => {
                setColor2(color.hex);
              }}
            /> : null}
            </Row>

            <Row> 
          {buttonactive3 ? 
          <CompactPicker
              color={color3}
              onChangeComplete={(color) => {
                setColor3(color.hex);
              }}
            /> : null}
            </Row>
            
            <Form.Label> Lights are currently </Form.Label>
            <Form.Check onClick = {() => setToggleactive(!toggleactive)}
              value = {toggleactive}
              type="switch"
              id="custom-switch"
              label= {toggleactive ? "Active" : "Disabled"}
              /> 

            </Form.Group>
            <Form.Group>
            <Form.Label>Number of Lights</Form.Label>
            <Form.Control
              type="text"
              name="light_number"
              id="light_number"
              placeholder="Enter number of lights on your shoe"
              value={lightsnumber}
              onChange={(num) => {setLightsnumber(num.value)}}
            />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Enter
          </Button>
          
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(AddProgram);
