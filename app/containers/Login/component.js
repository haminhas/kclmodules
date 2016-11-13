import React from 'react';
//import { browserHistory } from 'react-router';
import { Field } from 'redux-form';

import Form from 'app/components/Form';
import InputField from 'app/components/InputField';
import SmallContainer from 'app/components/SmallContainer';

import style from './style.css';

// import {
//   CREATE_ACCOUNT,
//   FORGOTTEN_PASSWORD,
// } from 'app/containers/Router/routes';

const Login = props => (
  <SmallContainer>
    <Form {...props} buttonText="Log in" >
      <div className={style.inputFields}>
        <Field
          name="email"
          title="Email"
          placeholder="e.g. email@kcl.ac.uk"
          component={InputField}
          type="email"
        />
        <Field
          name="password"
          title="Password"
          placeholder="Type your password here"
          component={InputField}
          type="password"
        />
      </div>
    </Form>
  </SmallContainer>
);

export default Login;
