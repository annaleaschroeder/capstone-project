import React, { useState } from 'react'
import styled from 'styled-components/macro'
//import { v4 as uuidv4 } from 'uuid'

export default function TransactionFormInput() {
  const [formData, setFormData] = useState('')
  const [disabledButton, setDisabledButton] = useState(true)
  return (
    <FormStyled onSubmit={handleAdd}>
      <PlaceholderButton>Placeholder-Toggle</PlaceholderButton>
      <LableWrapper>
        <lable htmlFor="transactionInput">
          Enter new transaction
          <TransactionInput
            id="transactionInput"
            name="transaction"
            placeholder="Enter new Transaction"
            value={formData.transaction}
            onChange={handleChange}
          />
        </lable>
      </LableWrapper>
      <Currency>Euro</Currency>

      <AddTransactionButton disabled={disabledButton}>
        Add Transaction
      </AddTransactionButton>
    </FormStyled>
  )

  function handleChange() {
    setDisabledButton(formData.transaction === '' ? true : false)
  }

  function handleAdd(event) {
    event.preventDevault()
    const form = event.target
    const input = form.transaction
    // onCreateTransaction({ text: input.value, id: uuidv4() })
    form.reset()
    setFormData('')
    input.focus()
  }
}

const FormStyled = styled.form`
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 20px;
  padding: 20px;
`

const LableWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
`
const PlaceholderButton = styled.button`
  display: block;
  width: 100px;
  height: auto;
  padding: 10px;
  justify-content: center;
`

const TransactionInput = styled.input`
  display: block;
`

const Currency = styled.h4`
  display: inline-block;
`
const AddTransactionButton = styled.button`
  display: block;
  width: 100px;
  height: auto;
  padding: 10px;
  background-color: green;
  justify-content: grid-column-end;
`