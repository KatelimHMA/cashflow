import {getUserToken} from "../utils/authUtilis";

export const getAllTransactions = () => {
    const userToken = getUserToken();
    const storedTransactions = localStorage.getItem(userToken);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
};


export const addTransaction = (newTransaction) => {
    // Retrieve user token from localStorage
    const userToken = getUserToken();

    // Get all transactions on the localStorage
    const storedTransactions = getAllTransactions();

    // Add new transaction
    storedTransactions.push(newTransaction);

    // Store a new transaction at localStorage.
    localStorage.setItem(userToken, JSON.stringify(storedTransactions));
    
    return storedTransactions;
};



export const deleteTransaction = (transactionId) => {
    const userToken = getUserToken();
    const storedTransactions = getAllTransactions();

    // Filtrar a transação que deseja remover
    const updatedTransactions = storedTransactions.filter(transaction => transaction.id !== transactionId);

    // Salvar o array de transações atualizado de volta no localStorage
    localStorage.setItem(userToken, JSON.stringify(updatedTransactions));

    // Atualizar o estado ou retornar o novo array de transações, se necessário
    return updatedTransactions;
};




// Sorting by date (from most recent to oldest)
export const sortTransactions = (transactions) => {
    return [...transactions].sort((b, a) => new Date(a.date) - new Date(b.date));
};


export const formatDate = (dateString) => {  
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate;
};


export const formatAmount = (amount) => {
	/**
	 * Cristian:
	 * Tens acesso a utilities como o NumberFormat.
	 * Ela é acessível por Intl.NumberFormat()
     * * Já retorna os valores formatados em númerico com o simbolo da moeda.*/

     const Euro = new Intl.NumberFormat('pt-pt', {
        style: 'currency',
        currency: 'Eur',
    });

    return Euro.format(amount); 
};