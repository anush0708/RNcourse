
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const AllExpenses = () => {
  const expenses=useSelector(state=>state.expenses)
  return <ExpensesOutput expenses={expenses} expensesPeriod='Total' fallbackText="No registered expenses found" />
}

export default AllExpenses