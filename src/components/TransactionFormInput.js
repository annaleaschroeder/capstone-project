import React from 'react'
import styled from 'styled-components/macro'
import { useForm } from 'react-hook-form'

export default function TransactionFormInput({ addTransactionEntry }) {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (transaction, event) => {
    event.target.reset()
    addTransactionEntry(transaction)
  }

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <input
          id="transactionInput"
          name="transactionInput"
          placeholder="Enter new Transaction"
          ref={register({
            required: true,
            min: 1,
            // pattern: /'^[0-9]+([.][0-9]{1,2})?'/i,
          })}
        />
        {errors.transactionInput &&
          errors.transactionInput.type === 'required' && (
            <p>Transaction required. Example: 20.95. </p>
          )}
      </InputContainer>
      <LableStyled htmlFor="transactionInput">Euro</LableStyled>
      <CancelButton type="reset">Cancel</CancelButton>
      <AddTransactionButton type="submit">Add Transaction</AddTransactionButton>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
`
const InputContainer = styled.div`
  display: flex;
`

const AddTransactionButton = styled.button`
  display: block;
  width: 200px;
  height: auto;
  padding: 10px;
  background-color: lightgrey;
  justify-content: grid-column-end;
`

const LableStyled = styled.label`
  font-weight: bold;
`
const CancelButton = styled.button`
  display: block;
  width: 100px;
  height: auto;
  padding: 10px;
  background-color: lightgrey;
  justify-content: grid-column-end;
`
