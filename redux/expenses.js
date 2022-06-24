import {createSlice} from '@reduxjs/toolkit'
const DUMMY_EXPENSES=[
    {
      id:1,
      description:'A pair of shoes',
      amount:59.99,
      date: new Date('2022-01-01')
    },
    {
      id:2,
      description:'shoes',
      amount:189.99,
      date:new Date('2022-02-01')
    },
    {
      id:3,
      description:'A banana',
      amount:59,
      date:new Date('2022-06-05')
    },
    {
        id:4,
        description:'bought a bottle',
        amount:19,
        date:new Date('2022-06-05')
      },
      {
        id:5,
        description:'A cycle',
        amount:49,
        date:new Date('2022-06-05')
      },
    {
      id:6,
      description:'A pair of books',
      amount:59,
      date:new Date('2021-11-01')
    },
    {
      id:7,
      description:'A pair of shoes',
      amount:59,
      date:new Date('2021-12-01')
    },
  
  ];
const expenseSlice=createSlice({
    name:'expenses',
    initialState:DUMMY_EXPENSES,
    reducers:{
        addExpense:(state,action)=>{
            const id=state.length+1
            state.push({...action.payload,id:id})
        },
        deleteExpense:(state,action)=>{
            console.log("action payload",action)
            state.filter((item)=>{
                console.log(item.id,action.payload,"result:",item.id!==action.payload)
                return item.id!==action.payload})
                console.log(state)
        },
        updateExpense:(state,action)=>{
            state.map((item)=>item.id===action.payload&&{...item,...action.payload})
        }
    }
})

export const {addExpense,deleteExpense,updateExpense}=expenseSlice.actions
export default expenseSlice.reducer