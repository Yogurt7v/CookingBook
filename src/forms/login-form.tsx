'use client';
import { Form, Input, Button } from '@heroui/react';
import { useState } from 'react';

interface IProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: IProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '12345',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submited', formData);
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
          return null;
        }}
      />
      <Input
        isRequired
        errorMessage="Password is not correct"
        label="Confirm Password"
        labelPlacement="outside"
        name="Confirm Password"
        placeholder="Repeat your Password"
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен';
          if (value !== formData.confirmPassword) return 'Неправильный пароль';
          return null;
        }}
      />

      <div className="flex w-[100%] gap-4 items-center pt-8 justify-center">
        <Button variant="solid" className="hover: bg-blue-500 hover:text-white">
          Войти
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
