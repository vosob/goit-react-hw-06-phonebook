import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  ContactsBookForm,
  Text,
  ContactsBookInput,
  SubmitBtn,
  ValidationError,
} from './PhoneBookForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactSlice';

const PhoneBookSchema = Yup.object().shape({
  name: Yup.string().min(3, 'To short!').required('This field is required!'),
  number: Yup.string()
    .min(6, 'Too short!')
    .max(9, 'Too long!')
    .required('This field is required!'),
});

export const PhoneBookForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={PhoneBookSchema}
      onSubmit={(value, helper) => {
        dispatch(addContact(value));
        helper.resetForm({
          values: {
            name: '',
            number: '',
          },
        });
      }}
    >
      <ContactsBookForm>
        <label>
          <Text>Name:</Text>
          <ContactsBookInput name="name" placeholder="Vlad" />
          <ValidationError name="name" component="span" />
        </label>

        <label>
          <Text> Number:</Text>
          <ContactsBookInput
            type="text"
            name="number"
            placeholder="111-11-11"
          />
          <ValidationError name="number" component="span" />
        </label>
        <SubmitBtn type="submit">Add contact</SubmitBtn>
      </ContactsBookForm>
    </Formik>
  );
};
