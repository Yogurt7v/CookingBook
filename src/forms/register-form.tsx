'use client';
import createUser from '@/actions/create-user';
import { Form, Input, Button } from '@heroui/react';
import { useState } from 'react';

interface IProps {
  onClose: () => void;
}

export default function RegistrationForm({ onClose }: IProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await createUser(formData);
    console.log('User created', user);
    onClose();
  };

  return (
    <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return 'Почта обязательна';
          if (!validateEmail(value)) return 'Некорректный адрес';
        }}
      />

      <Input
        isRequired
        errorMessage="Password is not correct"
        label="Password"
        labelPlacement="outside"
        name="Password"
        placeholder="Repeat your Password"
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен';
          if (value.length < 8) return 'Пароль должен быть длиннее 8 символов';
          return null;
        }}
      />
      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Confirm Password"
        labelPlacement="outside"
        name="Confirm password"
        placeholder="Enter your Password"
        type="password"
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен';
          if (value !== formData.password) return 'Пароль не совпадает';
          return null;
        }}
      />

      <div className="flex w-[100%] gap-4 items-center pt-8 justify-center">
        <Button
          variant="solid"
          className="hover: bg-blue-500 hover:text-white"
          type="submit"
        >
          Зарегистрироваться
        </Button>
        <Button
          variant="solid"
          type="submit"
          onPress={onClose}
          className="hover:bg-red-500"
        >
          Отмена
        </Button>
      </div>
    </Form>
  );
}
