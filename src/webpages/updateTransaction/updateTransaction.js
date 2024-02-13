import "./updateTransaction.css";
import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from "react";

function UpdateTransaction() {

const {id} = useParams();

console.log(id);

// A partir do id, pegar os dados no local storage e preencher o formulário.
// Depois fazer o envio dos novos dados.

 return(
  <div>Id: {id}</div>
 );
}

export default UpdateTransaction;