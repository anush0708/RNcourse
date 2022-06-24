import { useState } from 'react'
import {View,StyleSheet,Text,Alert} from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { getFormattedDate } from '../../util/date'
import Button from '../UI/Button'
import Input from './Input'

const ExpenseForm = ({submitButtonLabel,onCancel,onSubmit,defaultValues}) => {
    const [expense,setExpense]=useState({
        amount:{
            value:defaultValues?defaultValues.amount.toString(): "",
            isValid:true
        },
        date: {
            value:defaultValues?getFormattedDate(defaultValues.date): "",
            isValid:true
        },
        description:{
            value:defaultValues?defaultValues.description: "",
            isValid:true
        }
    })

    function  inputChangeHandler(inputIdentifier ,enteredText){
        setExpense((currentExpense)=>({...currentExpense,[inputIdentifier]:{value:enteredText,isValid:true}}))
    }

    const submitHandler=()=>{
         const expenseData={
             amount:+expense.amount.value,
             date:new Date(expense.date.value),
             description:expense.description.value
         }
        const amountIsValid= !isNaN(expenseData.amount)&&expenseData.amount>0
        const dateIsValid=expenseData.date.toString()!=='Invalid Date';
        const descriptionIsValid=expenseData.description.trim().length>0
        
        if(!amountIsValid||!dateIsValid||!descriptionIsValid)
        {
            //Alert.alert('Invalid input','Please check your input values')
        setExpense((currentExpense)=>{
                return {
                    amount:{value:currentExpense.amount.value,isValid:amountIsValid},
                    date:{value:currentExpense.date.value,isValid:dateIsValid},
                    description:{value:currentExpense.description.value,isValid:descriptionIsValid}
                }
            })
            return
        }

         onSubmit(expenseData)
    }

    const formIsInvalid=
    !expense.amount.isValid||
    !expense.date.isValid||
    !expense.description.isValid
  return (
    <View style={styles.form}>
        <Text style={styles.title}> Your Expense </Text>
        <View style={styles.inputsRow} >
        <Input label="Amount" 
        invalid={!expense.amount.isValid}
        style={styles.rowInput} 
        textInputConfig={{
            keyboardType:'decimal-pad',
            value:expense.amount.value,
            onChangeText:inputChangeHandler.bind(this,"amount"),
            }}
             />
        <Input label="Date"
        invalid={!expense.date.isValid}
        style={styles.rowInput} textInputConfig={{
            placeholder:'YYYY-MM-DD',
            maxLength:10,
            onChangeText:inputChangeHandler.bind(this,"date"),
            value:expense.date.value
            }
        }  />
        </View>
        
        <Input  label="Description" 
        invalid={!expense.description.isValid}
         textInputConfig={
            {
                multiline:true,
                onChangeText:inputChangeHandler.bind(this,"description"),
                value:expense.description.value
                //autoCorrect deafult true
                //autoCapitalize default Sentences
            }
        }
         />
         {formIsInvalid&&<Text style={styles.errorText}>Invalid input values please check</Text>}
    <View style={styles.buttons}>
        <Button style={styles.button}
         mode="flat" 
         onPress={onCancel}>
             Cancel
             </Button>
        <Button style={styles.button} 
        onPress={submitHandler}>
           {submitButtonLabel}
            </Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles=StyleSheet.create({
    form:{
        marginTop:30,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'

    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        minWidth:120,
        marginHorizontal:8
    
      },
      errorText:{
          textAlign:'center',
          color:GlobalStyles.colors.error500,
          margin:8
      },
    rowInput:{
        flex:1,
    }
})