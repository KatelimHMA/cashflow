// This component defines a form to add a new transaction.
// It uses states to store transaction data, including date, category, description, amount, and whether it is an expense.
// The component displays category options from an array imported from another file.
// In JSX, input fields for date, category, description, and amount are rendered, along with a button to add the transaction.

import React, {useState, useEffect} from "react";
import {transactionCategoryOptions} from "../../data/transactionCategoryOptions";
import { v4 as uuidv4 } from 'uuid';
import {addTransaction} from '../../utils/transactionUtils.js';
import "./transactionForm.css";


function TransactionForm({setTransactions}) {
	// These states are used to store the transaction data entered by the user in the form.
	/**
     * Cristian:
     * Estás a computar muitas variáveis para representar estados guardados. 
     * Pensa que, seria mais benéfico guardar tudo na mesma variável, assim: 
     *  
     * ```javascript
     * const [transationState, setTransactionState] = useState(
        {
            date: '',
            category: '',
            description: '',
            amount: '', // já agora amount devia ser um Number e não uma String
            isExpense: false,
        }
     )
     * ```
     * E depois no set seria assim: 
     * ```javascript
     * setTransactions(
     *      {
     *          date: '', 
     *          category: '',
     *          description: '', 
     *          amount: '', 
     *          isExpense: false
     *      }
     * );
     * ```
     * Quando o uso do useState se torna recorrente é necessário pensar na derivação destas variáveis, cada uma destas é um ponto de escuta para um possível render
     * Outro tipo de estratégia, se quiseres utilizar e até acho conveniente é a utilização de um useReducer em vez de um useState. 
     * A tua escolha é baseada na ação destas variáveis e na forma como eles combinam entre elas. 
     * Lembro também que a utilização de objectos é sempre diferente porque na essência, um objecto não é comparável com outro. 
     * {} === {} // false.
     * Tendo isto em conta é necessário ter cuidado na utilização de um useEffect.
     * 
     */

	const [transactionState, setTransactionState] = useState (
	{
		date: '',
		category: '',
		description: '',
		amount: '',
		isExpense: false,
	});

	// The handleCategoryChange function is responsible for updating the category and transaction type based on selected option.
	const handleCategoryChange = (e) => {
		const selectedCategoryName = e.target.value; // Gets the name of the selected category
		const selectedCategory = transactionCategoryOptions.find((option) => option.category === selectedCategoryName); // Finds the selected category object

		setTransactionState(prevState => ({
			...prevState,
			category: selectedCategoryName, // Updates the category state with the name of the selected category
			isExpense: selectedCategory.type === "expense"
		}));

	};

	const handleAddTransaction = () => {
        console.log('teste')
		/**
		 * Cristian:
		 * Em vez de alerts, crias um state para gerir os erros e representa-los nas vista como parte integrante do formulário.
		 */
		if (!transactionState.date || !transactionState.category || !transactionState.description || !transactionState.amount) {
			alert("Por favor, preencha todos os campos.");
			return;
		}

		if (transactionState.amount <= 0) {
			alert("Insira um valor positivo.");
			return;
		}

		// Library UUID to generate unique IDs.
		const id = uuidv4();

		// It creates a new transaction object with the form data.
		/**
             * 
         * Cristian:
         * Não precisas de utilizar [key]:value, quando os nomes são iguais.
         * eg: 
         * ```javascript
         *  const newTransaction = {
					id,
					date,
					category,
					description,
					amount,
					isExpense,
				};
         * ```
         */

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
		<form className="Transaction-form-container">
			<div className="Transaction-input-content">
				<label htmlFor="date"> Data</label>
				<input type="date" 
				name="date" id="date" 
				value={transactionState.date} 
				onChange={(e) => setTransactionState(prevState => ({ ...prevState, date: e.target.value }))} 
				required />
			</div>

			<div className="Transaction-input-content">
            {/* 
            * Cristian: 
            * Faltam atributos de acessibilidade : aria-labels, htmlFor, etc.
            * Pesquisa por "aria-"
             */}
				<label htmlFor="transactionCategory" aria-label="Selecione a categoria">Categoria</label>
				<select name="transactionCategory" value={transactionState.category} onChange={handleCategoryChange} required>
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
					value={transactionState.description}
					onChange={(e) => setTransactionState(prevState => ({ ...prevState, description: e.target.value }))}
					required
				/>
			</div>

			<div className="Transaction-input-content">
				<label htmlFor="amount"> Valor </label>
				<input type="number" 
				name="amount" 
				value={transactionState.amount} 
				onChange={(e) => setTransactionState(prevState => ({ ...prevState, amount: e.target.value }))}
				required />
			</div>

			<button type="button" onClick={handleAddTransaction}>
				Adicionar
			</button>
		</form>
	);
}

export default TransactionForm;