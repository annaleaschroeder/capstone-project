import React, { useState } from 'react'
import styled from 'styled-components/macro'
import DeleteButton from '../../common/buttons/deleteButton/DeleteButton'
import EditButton from '../../common/buttons/editButton/EditButton'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

Transaction.propTypes = {
  createdAt: PropTypes.string.isRequired,
  newTransaction: PropTypes.number,
  type: PropTypes.string.isRequired,
  notes: PropTypes.string,
  tag: PropTypes.string.isRequired,
  id: PropTypes.string,
}

export default function Transaction({
  createdAt,
  newTransaction,
  type,
  notes,
  tag,
  id,
  deleteTransaction,
}) {
  const [notesSectionVisible, setNotesSectionVisible] = useState(false)
  const history = useHistory()

  const formatCurrency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(newTransaction)

  const value = `${type === 'spending' ? '-' : '+'}${formatCurrency}`

  return (
    <>
      <TimestampStyled>{createdAt}</TimestampStyled>
      <StyledTransaction onClick={toggleNotes} data-cy={`transaction-${id}`}>
        <PositionDeleteButton>
          <DeleteButton onClick={deleteTransaction} />
        </PositionDeleteButton>
        <PositionEditButton>
          <EditButton onClick={transitionToEditTransactionPage} />
        </PositionEditButton>
        <TagContainer>
          <TagStyled className={tag.toLowerCase()}>{tag}</TagStyled>
        </TagContainer>
        <ValueStyled className={type}>{value}</ValueStyled>
        {notesSectionVisible ? (
          <NotesSection className={notesSectionVisible ? 'shownotes' : ''}>
            {notes}
          </NotesSection>
        ) : null}
      </StyledTransaction>
    </>
  )
  function toggleNotes(event) {
    event.stopPropagation()
    setNotesSectionVisible(!notesSectionVisible)
  }
  function transitionToEditTransactionPage(event) {
    event.stopPropagation()
    history.push(`/transactions/${id}`)
  }
}

const TimestampStyled = styled.span`
  font-weight: bold;
`

const StyledTransaction = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  position: relative;
  border: 2px solid transparent;
  box-shadow: 5px 5px 10px var(--grey-shadow);
  margin-bottom: 25px;
  margin-right: 15px;
  padding: 5px;
  border-radius: 20px;
  word-break: break-all;
  line-height: 1.5;
`
const PositionDeleteButton = styled.div`
  position: absolute;
  top: -10px;
  right: -35px;
`

const PositionEditButton = styled.div`
  position: absolute;
  top: 27px;
  right: -35px;
`

const TagContainer = styled.span`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-top: 2px;
`

const TagStyled = styled.div`
  display: block;
  color: var(--black);
  border: 2px solid;
  border-radius: 20px;
  text-align: center;
  word-break: keep-all;
  width: min-content;
  padding: 0 5px;
  font-size: 90%;

  &.leisure {
    color: var(--tag-leisure);
    border-color: var(--tag-leisure);
  }

  &.food {
    color: var(--tag-food);
    border-color: var(--tag-food);
  }

  &.fixedcosts {
    color: var(--tag-fixed-cost);
    border-color: var(--tag-fixed-cost);
  }

  &.miscellaneous {
    color: var(--tag-misc);
    border-color: var(--tag-misc);
  }

  &.transportation {
    color: var(--tag-transportation);
    border-color: var(--tag-transportation);
  }

  &.earnings {
    color: var(--tag-earnings);
    border-color: var(--tag-earnings);
  }
`

const ValueStyled = styled.span`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: end;
  padding: 5px;

  &.spending {
    color: var(--red-transaction);
  }

  &.income {
    color: var(--green-transaction);
  }
`

const NotesSection = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / span 3;
  text-align: left;
  word-break: break-all;
  padding: 5px;
  height: 0;
  transition: all 7s cubic-bezier(0.65, 0.5, 0.6, 1) 5s;
  overflow: hidden;

  &.shownotes {
    height: fit-content;
  }
`
