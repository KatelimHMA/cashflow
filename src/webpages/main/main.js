import TransactionForm from "../../components/transactionForm/transactionForm";
import TransactionHistory from "../../components/transactionHistory/transactionHistory";
import "./main.css";
import React, {useState, useEffect} from "react";


function Main() {

    // State variable to store transactions
    const [transactions, setTransactions] = useState([]);

    /**
     * Cristian:
     * Não utilizes lógica de autenticação misturada com o acesso aos campos que queres.
     * Tem mais sentido a vista só ser acessível caso o user esteja logado e então aí sim, vê a homepage.
     * No futuro, a vista, e o endpoint estarão protegidos pelo token de autenticação, só poderás fazer pedidos(através de um middleware de autenticação) 
     * à API e obter as transactions se tiveres tokens.
     * 
     */
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