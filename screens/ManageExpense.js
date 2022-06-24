import { View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense, updateExpense } from "../redux/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const editedExpenseId = route.params?.expenseId;
	const isEditing = !!editedExpenseId;
	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [navigation, isEditing]);

	const selectedExpense = useSelector((state) => state.expenses).find(
		(expense) => expense.id === editedExpenseId,
	);
	const deleteExpenseHandler = () => {
		dispatch(deleteExpense(editedExpenseId));
		navigation.goBack();
	};
	const cancelHandler = () => {
		navigation.goBack();
	};
	const confirmHandler = (expenseData) => {
		if (isEditing) {
			dispatch(updateExpense(expenseData));
		} else {
			storeExpense(expenseData);
			dispatch(addExpense(expenseData));
		}

		navigation.goBack();
	};
	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={isEditing ? "Update" : "Add"}
				onCancel={cancelHandler}
				onSubmit={confirmHandler}
				defaultValues={selectedExpense}
			/>

			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon="trash"
						color={GlobalStyles.colors.error500}
						size={36}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
};

export default ManageExpense;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800,
	},

	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: "center",
	},
});
