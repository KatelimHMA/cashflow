import "./UpdateTransaction.css";
import { useParams } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import { getTransactionById, updateTransaction} from "../../utils/transactionUtils";
import {transactionCategoryOptions} from "../../data/transactionCategoryOptions.js";
import { useNavigate } from 'react-router-dom';
import EmptyState from "../../components/EmptyState/EmptyState.js";

function UpdateTransaction() {

  const {id} = useParams();

  const [transactionState, setTransactionState] = useState (
    {
      date: '',
      category: '',
      description: '',
      amount: '',
      isExpense: false,
    });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  
  // depois, conforme o usuário preencher o form, mudar o useState
  
  // The handleCategoryChange function is responsible for updating the category and transaction type based on selected option.
  const handleCategoryChange = (e) => {
  const selectedCategoryName = e.target.value; // Gets the name of the selected category
  const selectedCategory = transactionCategoryOptions.find((option) => option.category === selectedCategoryName); // Finds the selected category object

  setTransactionState(prevState => ({
    ...prevState,
    category: selectedCategoryName, // Updates the category state with the name of the selected category
    isExpense: selectedCategory.type === "expense"
  }));
  setError(''); // Clean the error state!
  };

//
  useEffect(() => {
    //Asynchronous function defined within a useEffect hook.
    const fetchTransaction = async () => {
      
      const transaction = await getTransactionById(id);  
      //It is used to pause execution of the fetchTransaction function until the Promise returned by getTransactionById(id) is resolved.

      if (!transaction || !transaction.length < 0) {
        return <EmptyState msg="Transação não encontrada." />
      }
      setTransactionState(transaction);
    };

    fetchTransaction();
  }, []); // The effect will run once.

  

  // Depois fazer o envio dos novos dados, ao clicar no botão.
	const handleUpdateTransaction = () => {
      console.log('teste')
      if (!transactionState.date || !transactionState.category || !transactionState.description || !transactionState.amount) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      if (transactionState.amount <= 0) {
        setError("Insira um valor positivo.");
        return;
      }

      const newTransaction = {
        id: id,
        date: transactionState.date,
        category: transactionState.category,
        description: transactionState.description,
        amount: transactionState.amount,
        isExpense: transactionState.isExpense,
      };

      // Update the new transaction to localStorage
      const updatedTransactions = updateTransaction(newTransaction);
      setTransactionState(updatedTransactions);

      // navigates to main
      navigate('/main');
  };

  return(
    <div className="update-form">
      <div className="update-form__header"> 
        <span>Editar Transação</span>
      </div>

      <form>
          <div className="update-form__input-container">
            <label htmlFor="date"> Data</label>
            <input 
              type="date" 
              name="date" 
              id="date" 
              aria-label="Escolha a data da transação"
              required 
              value={transactionState.date}
              onChange={(e) => {
                setTransactionState(prevState => ({ ...prevState, date: e.target.value }));
                setError(''); // Clean the error state!
              }}
            />
          </div>

          <div className="update-form__input-container">

            <label htmlFor="transactionCategory">Categoria</label>
            <select 
              name="transactionCategory" 
              id="transactionCategory"
              value={transactionState.category}
              onChange={handleCategoryChange}
              aria-label="Selecione a categoria da transação" 
              required
            >

              <option value="" disabled hidden>
                {" "}
              </option>

              {transactionCategoryOptions.map((option, index) => (
                <option key={index} value={option.category}>
                  {option.category}
                </option>
              ))}
            </select>
          </div>

          <div className="update-form__input-container">
            <label htmlFor="description"> Descrição </label>
            <input
              type="text"
              name="description"
              id="description"
              aria-label="Digite a descrição da transação"
              required
              value={transactionState.description}					
              onChange={(e) => {
                setTransactionState(prevState => ({ ...prevState, description: e.target.value }));
                setError(''); // Clean the error state!
              }}
            />
          </div>

          <div className="update-form__input-container">
            <label htmlFor="amount"> Valor </label>
            <input type="number" 
              name="amount" 
              id="amount"
              aria-label="Digite o valor da transação"
              required
              value={transactionState.amount} 
              onChange={(e) => {
                setTransactionState(prevState => ({ ...prevState, amount: e.target.value }));
                setError(''); // Clean the error state!
              }} />
          </div>
        
          <button type="button" onClick={handleUpdateTransaction}>
            Enviar
          </button>
        </form>

        {/* It only shows the error message if error were not empty. */}
        {error && <div className="error-message">{error}</div>}

    </div>
  );
}

export default UpdateTransaction;