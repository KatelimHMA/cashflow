import {getUserToken} from "../utils/authUtilis";

export const getAllTransactions = () => {
    const userToken = getUserToken();
    const storedTransactions = localStorage.getItem(userToken);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
};

export const getTransactionById = (transactionId) => {
    const storedTransactions = getAllTransactions();
    const foundTransaction = storedTransactions.filter(transaction => transaction.id == transactionId);
    return foundTransaction[0];
}

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


export const updateTransaction = (updatedTransaction) => {
    // Retrieve user token from localStorage
    const userToken = getUserToken();

    // Get all transactions on the localStorage
    const storedTransactions = getAllTransactions();

    // Find the transaction we want to update
    const transactionIndex = storedTransactions.findIndex(transaction => transaction.id === updatedTransaction.id);
        // findIndex - Returns the index of the first element in the array that satisfies the condition (in this case, having the correct id).
        // If it does not find an element, it returns -1.

    
    // If the transaction is found, update it
    if (transactionIndex !== -1) {
        storedTransactions[transactionIndex] = updatedTransaction;
    }
    
    // Store the updated transaction in localStorage
    localStorage.setItem(userToken, JSON.stringify(storedTransactions));
    
    // Return the updated transactions
    return storedTransactions;
};


export const deleteTransaction = (transactionId) => {
    const userToken = getUserToken();
    const storedTransactions = getAllTransactions();

    // Filter the transaction I want to remove
    const updatedTransactions = storedTransactions.filter(transaction => transaction.id !== transactionId);

    // Save the updated transactions array back to localStorage.
    localStorage.setItem(userToken, JSON.stringify(updatedTransactions));

    // Update the state or return the new transactions array, if needed.
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
     const Euro = new Intl.NumberFormat('pt-pt', {
        style: 'currency',
        currency: 'Eur',
    });

    return Euro.format(amount); 
};