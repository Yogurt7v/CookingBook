'use client';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';

export default function IngredientsForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    pricePerUnit: null as number | null,
    description: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Form className="w-[400px]" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Название ингридиента"
        name="name"
        type="text"
        classNames={{
          innerWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        value={formData.name}
        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        validate={(value) => {
          if (!value) {
            return 'Название обязательно';
          }
          return null;
        }}
      />
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            placeholder="Категория"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            placeholder="Единица измерения"
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: 'bg-default-100 w-full',
              innerWrapper: 'text-sm',
              value: 'truncate',
              selectorIcon: 'text-black',
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            placeholder="Цена за единицу"
            type="number"
            classNames={{
              innerWrapper: 'bg-default-100',
              input: 'text-sm focus:outline-none',
            }}
            value={formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ''}
            onChange={(event) => {
              const value = event.target.value ? parseFloat(event.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span className="absolute right-3 top-1/2 transform-translate-y-1/2">
                ₽
              </span>
            }
            validate={(value) => {
              if (!value) {
                return 'Цена за единицу обязательна';
              }
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) {
                return 'Цена должна быть больше положительной';
              }
              return null;
            }}
          />
        </div>
      </div>

      <Input
        name="description"
        placeholder="Описание (необязательно)"
        type="text"
        classNames={{
          innerWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        value={formData.description}
        onChange={(event) =>
          setFormData({ ...formData, description: event.target.value })
        }
      />

      <div className="flex w-full items-center justify-end">
        <Button color="primary" type="submit">
          Добавить
        </Button>
      </div>
    </Form>
  );
}
