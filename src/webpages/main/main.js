import TransactionForm from "../../components/transactionForm/transactionForm";
import TransactionHistory from "../../components/transactionHistory/transactionHistory";
import "./main.css";
import React, {useState, useEffect} from "react";


function Main() {

    // State variable to store transactions
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Retrieve user token from localStorage
        const userToken = localStorage.getItem('token');
        if (userToken) {
            // Retrieve transactions associated with the user from localStorage
            const storedTransactions = JSON.parse(localStorage.getItem(userToken));
            if (storedTransactions) {
                setTransactions(storedTransactions);
            }
        }
    }, []); 


    // Effect to display debugging information
    /*useEffect(() => {
        console.log(transactions);
    }, [transactions]);*/
    

    return (
        <div className="Main-container">
            <div className="Main-header">
                <h1>Controle Financeiro</h1>
            </div>
            <div className="Main-body">        
                <TransactionForm setTransactions={setTransactions}/>
                <TransactionHistory transactions={transactions}/>
            </div>
        </div>
    );
}

export default Main;