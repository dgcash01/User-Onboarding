import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({
  values,
  errors,
  touched,
  status
}) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(
      "status has changed!",
      status
    );

    status &&
      setUsers(users => [
        ...users,
        status
      ]);
  }, [status]);
  return (
    <div className="user-form">
      <Form>
      <h1 className='pageTitle'>New User Form</h1>
        <div className='formSubSection'>
          <label htmlFor="name">
            Name:<>  </> 
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="name"
            />
            {touched.name &&
              errors.name && (
                <p className="errors">
                  {errors.name}
                </p>
              )}
          </label>
        </div>
        <div className='formSubSection'>

        <label htmlFor="email">
          Email:<>  </>     
            <Field
            id="email"
            type="text"
            name="email"
            placeholder="email"
          />
          {touched.email && errors.email && (
            <p className="errors">
              {errors.email}
            </p>
          )}
        </label>
        </div>
        <div className='formSubSection'>


        <label htmlFor="password">
          Password:<>  </>   
            <Field
            id="password"
            type="text"
            name="password"
            placeholder="password"
          />
        </label>
        {touched.password && errors.password && (
          <p className="errors">
            {errors.password}
          </p>
        )}
        </div>
        <div className='formSubSection'>


        <label className="checkbox-container">
          Terms of Service:   
            <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>
        {touched.termsOfService && errors.termsOfService && (
          <p className="errors">
            {errors.termsOfService}
          </p>
        )}
        </div>
          <div className= 'btnStyle'>
        <button type="submit">
          Submit!
          </button>
          </div>

      </Form>
      <div className='userCard'>

      {users.map(user => {
        return (
            <ul key={user.id}>
            <li>Name: {user.name}</li>
            <br />
            <li>Email: {user.email}</li>
            <br />
            <li>Password: {user.password}</li>
            <br />
            <li>Assigned Id: {user.id}</li>
            <br />
            <li>Creation Date: {user.createdAt.split('.')[0].replace('T', ' ')}</li>
          </ul>
        );
      })}
      </div>
      <button className= 'saveUser'>Save User</button>
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      termsOfService:
        props.termsOfService || false
    };
  },
  
  validationSchema: Yup.object().shape({
    name: Yup.string().required('NAME IS REQUIRED').min(3, 'NAME IS TOO SHORT'),
    email: Yup.string().required('EMAIL IS REQUIRED').min(6, 'EMAIL IS TOO SHORT'),
    password: Yup.string().required('PASSWORD IS REQUIRED').min(8, 'PASSWORD IS TOO SHORT'),
    termsOfService: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  }),

  handleSubmit(
    values,
    { setStatus, resetForm }
  ) {
    console.log("submitting", values);
    axios
      .post(
        "https://reqres.in/api/users/",
        values
      )
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err =>
        console.log(err.response)
      );
  }
})(UserForm);
export default FormikUserForm;
