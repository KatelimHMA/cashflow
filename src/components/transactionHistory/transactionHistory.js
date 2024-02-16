import { formatDate, sortTransactions, formatAmount, deleteTransaction} from "../../utils/transactionUtils";
import EmptyState from "../EmptyState/EmptyState";
import "./TransactionHistory.css";
import React from "react";
import { Link } from 'react-router-dom'; 


function TransactionHistory({transactions}) {
 
 	const sortedTransactions = sortTransactions(transactions); // Sorting by date (from most recent to oldest)

	if (!sortedTransactions || !sortedTransactions.length) {
		return <EmptyState msg="Não há transações para exibir." />
	}

	const handleDeleteTransaction = async (transactionId) => {
		try {
			await deleteTransaction(transactionId);
			// reload the page
			window.location.reload();
		} catch (error) {
			// handle the error here
			console.error("Erro ao excluir transação:", error);
		}
	}; //using async and await ensures that the deletion is completed before the page is reloades.


	return (
		<table className="Transactions-table">
			<thead>
				<tr>
					<th className="table_header__date">Data</th>
					<th className="table_header__categogy">Categoria</th>
					<th>Descrição</th>
					<th className="table_header__amount">Valor</th>
					<th className="table_header__update"></th> 
					<th className="table_header__delete"></th> 
				</tr>
			</thead>
			<tbody>
				{sortedTransactions.map((transaction) => (
						<tr key={transaction.id}>
						<td>{formatDate(transaction.date)}</td>
						<td>{transaction.category}</td>
						<td>{transaction.description}</td>
						<td className={`tr tr-${transaction.isExpense ? "red" : "green"}`} style={{ color: transaction.isExpense ? "red" : "green" }}>
							{transaction.isExpense ? "- " : "+ "}
							{formatAmount(transaction.amount)}
						</td>
						
						<td className="table_td__btupdate">
							<Link to={`/update-transaction/${transaction.id}`}>
								<button type="button">
									<span className="Icon-update"></span>
								</button>
							</Link>				
						</td> 

						<td className="table_td__btdelete">
							<button type="button" onClick={() => handleDeleteTransaction(transaction.id)}>
								<span className="Icon-delete"></span>
							</button>
						</td>
					</tr>
					))}
			</tbody>
		</table>
	);
}

export default TransactionHistory;