'use client';

import { Form, Input, Button } from '@heroui/react';
import React from 'react';
export default function RegistrationForm() {
  const [password, setPassword] = React.useState('');
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const getPasswordError = (value: any) => {
    if (value.length < 8) {
      return 'Пароль должен быть длиннее 8 символов';
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return 'Нужен хотя бы 1 заглавный символ';
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return 'Нужен хотя бы 1 символ';
    }

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === 'admin') {
      newErrors.name = 'Nice try! Логин уже занят';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }
    console.log('data', data);
    setErrors({});
    setSubmitted(data);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return 'Please enter your name';
            }

            return errors.name;
          }}
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return 'Please enter your email';
            }
            if (validationDetails.typeMismatch) {
              return 'Please enter a valid email address';
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
