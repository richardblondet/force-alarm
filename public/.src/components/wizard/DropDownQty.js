import React from 'react';
import {
  Container,
  Jumbotron,
  Row, 
  Col,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardDeck, Card, CardBody, CardText
} from "reactstrap";


export const DropDownQty = (props) => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [quantiy, setQuantiy] = React.useState(1);

   const handlQuantity = (qty) => {
    setQuantiy(qty)
    props.productQuantity(qty);
  }

  return (
    <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle caret>
      {quantiy}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem ><div onClick={() => handlQuantity(1)}>1</div></DropdownItem>
        <DropdownItem ><div onClick={() => handlQuantity(2)}>2</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(3)}>3</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(4)}>4</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(5)}>5</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(6)}>6</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(7)}>7</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(8)}>8</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(9)}>9</div></DropdownItem>
        <DropdownItem><div onClick={() => handlQuantity(10)}>10</div></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}