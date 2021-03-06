import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

TransactionFormInput.propTypes = {
  onSave: PropTypes.func.isRequired,
}

export default function TransactionFormInput({
  onSave,
  notes = '',
  value = '',
  tag = '',
}) {
  const history = useHistory()

  return (
    <Formik
      initialValues={{ value, notes, tag }}
      enableReinitialize={true}
      validationSchema={Yup.object().shape({
        value: Yup.string()
          .required('Required')
          .min(1, 'Please enter a value')
          .matches(/^[0-9]+([.,][0-9]{1,2})?$/, 'Invalid format.'),
        notes: Yup.string().max(100, 'Too long'),
        tag: Yup.string().required('Required'),
      })}
      onSubmit={(form, { resetForm }) => {
        onSave(form.value, form.notes, form.tag)
        resetForm({
          values: { value, notes, tag },
        })
        history.push('/')
      }}
    >
      {({ values, errors, touched }) => {
        return (
          <FormStyled autoComplete="off">
            <Input
              name="value"
              placeholder="Enter transaction"
              value={values.value}
              id="value"
            />
            {errors.value && touched.value ? (
              <ErrorMessageInput id="errorValue">
                {errors.value}
              </ErrorMessageInput>
            ) : null}
            <LableStyled htmlFor="value">Euro</LableStyled>
            <DropDown
              id="dropdown"
              name="tag"
              component="select"
              value={values.tag}
            >
              <option value="" hidden>
                -- Choose a tag --
              </option>
              <option value="Food">Food</option>
              <option value="Leisure">Leisure</option>
              <option value="FixedCosts">FixedCosts</option>
              <option value="Transportation">Transportation</option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Earnings">Earnings</option>
            </DropDown>

            {errors.tag && touched.tag ? (
              <ErrorDropDown>{errors.tag}</ErrorDropDown>
            ) : null}
            <Notes
              type="textarea"
              name="notes"
              id="notes"
              placeholder="Add notes to transaction"
              value={values.notes}
            />
            {errors.notes && touched.notes ? (
              <ErrorMessageNotes>{errors.notes}</ErrorMessageNotes>
            ) : null}

            <AddTrxBtn id="saveBtn" type="submit">
              Save
            </AddTrxBtn>

            <CancelBtn id="reset" type="reset">
              Reset
            </CancelBtn>
          </FormStyled>
        )
      }}
    </Formik>
  )
}

const FormStyled = styled(Form)`
  display: grid;
  margin: 20px 0;
  grid-template-rows: 1fr 0.1fr 1fr 0.1fr 1fr 0.1fr 1fr;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 20px;
  position: relative;
`
const LableStyled = styled.label`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  font-weight: bold;
  font-size: 100%;
  align-self: end;
  padding-bottom: 15px;
`

const Input = styled(Field)`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: end;
  border: 1px solid var(--black);
  border-radius: 5px;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background: none;
  box-shadow: 5px 5px 10px var(--grey-shadow);
  text-indent: 5px;
  font-size: 85%;
  line-height: 1.5;
`

const ErrorMessageInput = styled.div`
  color: red;
  font-size: 80%;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`
const DropDown = styled(Field)`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  box-shadow: 5px 5px 10px var(--grey-shadow);
  display: block;
  font-size: 90%;
  line-height: 1.5;
  width: 100%;
  height: 50px;
  max-width: 100%;
  margin: 0;

  border: 1px solid var(--black);
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  -moz-padding-start: calc(20px - 3px);
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`

const ErrorDropDown = styled.span`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  color: red;
  font-size: 80%;
`

const Notes = styled(Field)`
  grid-column: 2 / 3;
  grid-row: 5 / 6;
  align-self: end;
  border: 1px solid var(--black);
  border-radius: 5px;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background: none;
  box-shadow: 5px 5px 10px var(--grey-shadow);

  font-size: 85%;
  line-height: 1.5;
`

const ErrorMessageNotes = styled.div`
  color: red;
  font-size: 80%;
  grid-column: 2 / 3;
  grid-row: 6 / 7;
`

const AddTrxBtn = styled.button`
  justify-self: end;
  grid-column: 2 / 3;
  grid-row: 7 / 8;
  width: 90px;
  height: 50px;
  padding: 5px;
  font-size: 75%;
  font-weight: bold;
  color: var(--white);
  background: var(--blue-main);
  box-shadow: 5px 5px 10px var(--grey-shadow);
  border-radius: 5px;
  border: none;
  margin-top: 10px;
`

const CancelBtn = styled.button`
  grid-column: 2 / 3;
  grid-row: 7 / 8;
  justify-self: start;
  width: 90px;
  height: 50px;
  font-weight: bold;
  font-size: 75%;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 5px 5px 10px var(--grey-shadow);
  border: none;
  margin-top: 10px;
`
