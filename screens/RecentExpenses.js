import { useEffect } from "react";
import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
	const expenses = useSelector((state) => state.expenses);
	useEffect(() => {
		const fecthExpense = () => {
		const expenses=await	getExpenses();
		};
		fecthExpense();
	}, []);
	const recentExpenses = expenses.filter((expense) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return expense.date > date7DaysAgo;
	});
	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="last 7 days"
			fallbackText="No expenses registered for last 7 days"
		/>
	);
};

export default RecentExpenses;
