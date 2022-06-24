import axios from "axios";
const url = "https://react-native-project-4f08b-default-rtdb.firebaseio.com";
export function storeExpense(expenseData) {
	axios.post(url + "/expenses.json", expenseData);
	console.log("posted");
}

export async function getExpenses() {
	const response = await axios.get(url + "/expenses.json");

	const expenses = [];

	for (const key in response) {
		const expenseObj = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses.push(expenseObj);
	}
	return expenses;
}
