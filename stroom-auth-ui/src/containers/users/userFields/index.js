/*
 * Copyright 2017 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {Component} from 'react';
//import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import {Field} from 'formik';

import './UserFields.css';
import {required, email} from '../../../validations';

function AccountFields(props) {
  return undefined;
}

const Validation = ({propertyName, errors, touched}) => {
  const error = errors[propertyName];
  const isTouched = touched[propertyName];
  if (error && isTouched) {
    return <div className="validation-error">{error}</div>;
  } else {
    return null;
  }
};

class UserFields extends Component {
  constructor() {
    super();
    this.state = {
      isPasswordEditingEnabled: false,
    };
  }

  handleShowPasswordField() {
    this.setState({isPasswordEditingEnabled: true});
  }

  render() {
    const {
      showCalculatedFields,
      constrainPasswordEditing,
      errors,
      touched,
    } = this.props;
    const showPasswordField =
      this.state.isPasswordEditingEnabled || !constrainPasswordEditing;
    return (
      <div className="container">
        <div className="section">
            <div className="section__title"><h3>Account</h3></div>
          <div className="section__fields">
            <div className="section__fields__row">
              <div className="field-container vertical">
                <label>First name</label>
                <Field name="first_name" type="text" label="First name" />
              </div>
              <div className="field-container vertical">
                <label>Email</label>
                <Field name="email" validate={[required]} label="Email" />
                <Validation
                  propertyName="email"
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>

            <div className="section__fields__row">
              <div className="field-container vertical">
                <label>Last name</label>
                <Field name="last_name" type="text" label="Last name" />
              </div>
              <div className="field-container vertical">
                <label>Account status</label>
                <Field name="state" component="select" validate={[required]}>
                  <option value="enabled">Active</option>
                  <option value="disabled">Inactive</option>
                  <option value="locked">Locked</option>
                </Field>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
            <div className="section__title"><h3>Password</h3><p>You can change this user's password here</p></div>
          <div className="section__fields">
            <div className="section__fields__row">
              <div className="field-container vertical">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                />
                <Validation
                  propertyName="password"
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="field-container vertical">
                <label>Verify password</label>
                <Field name="verifyPassword" type="password" />
                <Validation
                  propertyName="verifyPassword"
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
            <div className="section__title"><h3>Comments</h3></div>
          <div className="section__fields">
            <div className="section__fields__row 1-column">
                <Field
                    className="section__fields__comments"
                name="comments"
                type="textarea"
              />
            </div>
          </div>
        </div>

        {showCalculatedFields ? (
          <React.Fragment>
            <div className="section">
                <div className="section__title"><h3>Statistics</h3></div>
              <div className="section__fields">
                <div className="section__fields_row">
                  <Field
                    disabled
                    name="login_failures"
                    type="text"
                    label="Login failures"
                  />

                  <Field
                    disabled
                    name="login_count"
                    type="text"
                    label="Login count"
                  />

                  <Field
                    disabled
                    name="last_login"
                    type="text"
                    label="Last login"
                  />
                </div>
              </div>
            </div>

            <div className="section">
                <div className="section__title"><h3>Audit</h3></div>
              <div className="section__fields">
                <div className="section__fields__rows">
                  <Field
                    disabled
                    name="updated_on"
                    type="text"
                    label="Updated on"
                  />

                  <Field
                    disabled
                    name="updated_by_user"
                    type="text"
                    label="Updated by"
                  />

                  <Field
                    disabled
                    name="created_on"
                    type="text"
                    label="Created on"
                  />

                  <Field
                    disabled
                    name="created_by_user"
                    type="text"
                    label="Created by"
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

UserFields.propTypes = {
  showCalculatedFields: PropTypes.bool.isRequired,
  constrainPasswordEditing: PropTypes.bool.isRequired,
};

export default UserFields;
