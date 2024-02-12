import {getUserToken} from "../utils/authUtilis";

export const addTransaction = (newTransaction) => {
    // Retrieve user token from localStorage
    const userToken = getUserToken();

    // Get all transactions on the localStorage
    const storedTransactions = JSON.parse(localStorage.getItem(userToken)) || [];

    // Add new transaction
    storedTransactions.push(newTransaction);

    // Store a new transaction at localStorage.
    localStorage.setItem(userToken, JSON.stringify(storedTransactions));
    
    return storedTransactions;
};


// Sorting by date (from most recent to oldest)
export const sortTransactions = (transactions) => {
    return [...transactions].sort((b, a) => new Date(a.date) - new Date(b.date));
}



export const formatDate = (dateString) => {  
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate;
}



export const formatAmount = (amount) => {
	/**
	 * Cristian:
	 * Tens acesso a utilities como o NumberFormat.
	 * Ela é acessível por Intl.NumberFormat()
     * 
     * ```javascript
     *  const Euro = new Intl.NumberFormat('pt-pt', {
            style: 'currency',
            currency: 'Eur',
        });

        return Euro.format(value); 
     * ```
     * Já retorna os valores formatados em númerico com o simbolo da moeda.
	 */
	return Math.abs(amount).toFixed(2) + " €";
}



