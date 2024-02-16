// This component defines a form to add a new transaction.
// It uses states to store transaction data, including date, category, description, amount, and whether it is an expense.
// The component displays category options from an array imported from another file.
// In JSX, input fields for date, category, description, and amount are rendered, along with a button to add the transaction.

import React, {useState} from "react";
import {transactionCategoryOptions} from "../../data/transactionCategoryOptions.js";
import { v4 as uuidv4 } from 'uuid';
import {addTransaction} from '../../utils/transactionUtils.js';
import "./TransactionForm.css";


function TransactionForm({setTransactions}) {
	// These states are used to store the transaction data entered by the user in the form.
	/**
     * Cristian:
     * Outro tipo de estratégia, se quiseres utilizar e até acho conveniente é a utilização de um useReducer em vez de um useState. 
     */

	const [transactionState, setTransactionState] = useState (
	{
		date: '',
		category: '',
		description: '',
		amount: '',
		isExpense: false,
	});

	const [error, setError] = useState('');

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

	const handleAddTransaction = () => {
        console.log('teste')

		if (!transactionState.date || !transactionState.category || !transactionState.description || !transactionState.amount) {
			setError("Por favor, preencha todos os campos.");
			return;
		}

		if (transactionState.amount <= 0) {
			setError("Insira um valor positivo.");
			return;
		}

		// Library UUID to generate unique IDs.
		const id = uuidv4();

		// It creates a new transaction object with the form data.
		const newTransaction = {
			id: id,
			date: transactionState.date,
			category: transactionState.category,
			description: transactionState.description,
			amount: transactionState.amount,
			isExpense: transactionState.isExpense,
		};

		// Add the new transaction to localStorage
		const updatedTransactions = addTransaction(newTransaction);
		setTransactions(updatedTransactions);

		
		// Clear the form fields after adding the transaction
		setTransactionState(
			{
			date: '', 
			category: '',
			description: '', 
			amount: '', 
			isExpense: false
 			});
	};

	return (
		<div>
			<form className="Transaction-form-container">
				<div className="Transaction-input-content">
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

				<div className="Transaction-input-content">
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

				<div className="Transaction-input-content">
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

				<div className="Transaction-input-content">
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
			
				<button type="button" onClick={handleAddTransaction}>
					Adicionar
				</button>
			</form>

			{/* It only shows the error message if error were not empty. */}
			{error && <div className="error-message">{error}</div>}	

		</div>
	);
}

export default TransactionForm;