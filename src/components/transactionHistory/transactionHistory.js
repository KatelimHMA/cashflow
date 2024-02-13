import { formatDate, sortTransactions, formatAmount, deleteTransaction} from "../../utils/transactionUtils";
import "./transactionHistory.css";
import React from "react";
import { Link } from 'react-router-dom'; 


function TransactionHistory({transactions}) {
	const sortedTransactions = sortTransactions(transactions); // Sorting by date (from most recent to oldest)

	if (!sortedTransactions.length) {
    return <p>Não há transações para exibir.</p>;
  }

	
	const handleDeleteTransaction = async (transactionId) => {
    await deleteTransaction(transactionId);
    // reload the page
		window.location.reload();
  };


	/**
	 * Cristian:
	 * E se não houver transacções? Qual é o empty state?
	 * Evita CSS Inline. Cria supremacia de hierarquia quando combinado com CSS Externo.
	 * é preferível:
	 * <th className="table_header__cell">Data</th>
	 */
	return (
		<table className="Transactions-table">
			<thead>
				<tr>
					<th className="table_header__date">Data</th>
					<th className="table_header__categogy">Categoria</th>
					<th>Descrição</th>
					<th className="table_header__amount">Valor</th>
					{/* <th className="table_header__update"></th> */}
					<th className="table_header__delete"></th> 
				</tr>
			</thead>
			<tbody>
				{sortedTransactions.map((transaction) => (
						<tr key={transaction.id}>
						<td>{formatDate(transaction.date)}</td>
						<td>{transaction.category}</td>
						<td>{transaction.description}</td>
						<td style={{ color: transaction.isExpense ? "red" : "green" }}>
							{transaction.isExpense ? "- " : "+ "}
							{formatAmount(transaction.amount)}
						</td>
						{/*
						<td className="table_td__btupdate">
							<Link to={`/update-transaction/${transaction.id}`}>
								<button type="button">
									<span className="Icon-update"></span>
								</button>
							</Link>				
						</td> */}

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