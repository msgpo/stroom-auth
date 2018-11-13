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

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {compose, withProps} from 'recompose';

import SpinnerIcon from './small_spinner.svg';
import './Button.css';

const enhance = compose(
  withProps(({isLoading, icon, className, type, disabled}) => {
    className = icon || isLoading ? className : 'no-icon ' + className;
    className = 'Button ' + (className || '');
    
    // We're going to default to the button type being 'button' instead of 'submit'. That's more appropriate for an SPA.
    type = type || 'button';

    // If isLoading is true then we don't want to be showing the icon
    icon = isLoading ? undefined : icon;
    // If is Loading is true then we want the button disabled
    disabled = isLoading ? true : disabled;
    return {
      icon,
      className,
      type,
        disabled
    };
  }),
);

const Button = ({
  icon,
  isLoading,
  type,
  className,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button type={type} className={className} disabled={disabled} {...rest}>
      {/* Wrap in a span to get spacing between the icon and the other children. */}
      {icon ? (
        <span>
          <FontAwesomeIcon icon={icon} />{' '}
        </span>
      ) : (
        undefined
      )}
      {isLoading ? <img alt="Loading..." src={SpinnerIcon} /> : undefined}
      <div className="Button__contents">{children}</div>
    </button>
  );
};

export default enhance(Button);