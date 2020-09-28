import React, { useState } from 'react'
import TransactionFormInput from '../form/TransactionFormInput'
import ToggleSwitch from '../toggleSwitch/ToggleSwitch'
import ReturnToOverviewButton from '../buttons/ReturnToOverviewButton'
import styled from 'styled-components/macro'
import { postNewTransactionEntry } from '../services/transactionServices'

export default function AddTransactionPage() {
  const [selected, setSelected] = useState(false)

  return (
    <PageStyled>
      <ReturnToOverviewButton />
      <ToggleSwitch selected={selected} onToggle={handleToggle} />
      <TransactionFormInput onSave={onSaveAddTransactionEntry} />
    </PageStyled>
  )

  function handleToggle() {
    setSelected(!selected)
  }

  function onSaveAddTransactionEntry(newTransactionValue, notes, tag) {
    const newTransaction = {
      type: selected ? 'income' : 'spending',
      value: parseFloat(newTransactionValue.replace(',', '.')),
      notes: notes,
      tag: tag,
    }

    postNewTransactionEntry(newTransaction)
    setSelected(false)
  }
}

const PageStyled = styled.div`
  margin: 20px;
`