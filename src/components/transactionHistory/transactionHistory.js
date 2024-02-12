import { formatDate, sortTransactions, formatAmount } from "../../utils/transactionUtils";
import "./transactionHistory.css";
import React from "react";



function TransactionHistory({transactions}) {
	const sortedTransactions = sortTransactions(transactions); // Sorting by date (from most recent to oldest)

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
					<th style={{ width: 120 }}>Data</th>
					<th style={{ width: 150 }}>Categoria</th>
					<th>Descrição</th>
					<th style={{ width: 120 }}>Valor</th>
					{/*<th style={{width: 10}}></th>*/}
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
						{/*<td><button>Editar</button></td>*/}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TransactionHistory;