import { formatDate, sortTransactions, formatAmount } from "../../utils/transactionUtils";
import "./transactionHistory.css";
import React from "react";



function TransactionHistory({transactions}) {   

    const sortedTransactions = sortTransactions(transactions); // Sorting by date (from most recent to oldest)

    return (
        <table className="Transactions-table">
            <thead>
                <tr>
                    <th style={{width: 120}}>Data</th>
                    <th style={{width: 150}}>Categoria</th>
                    <th>Descrição</th>
                    <th style={{width: 120}}>Valor</th>
                    {/*<th style={{width: 10}}></th>*/}
                </tr>
            </thead>
            <tbody>
                {sortedTransactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.description}</td>
                        <td style={{ color: transaction.isExpense ? 'red' : 'green' }}>
                            {transaction.isExpense ? '- ' : '+ '}
                            {formatAmount(transaction.amount)}
                        </td>
                        {/*<td><button>Editar</button></td>*/}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TransactionHistory;