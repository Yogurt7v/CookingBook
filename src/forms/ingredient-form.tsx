'use client';
import TableIngredients from '@/components/ui/tabels/tabels';
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { useIngredientsStore } from '@/store/ingredients-store';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button, Select, SelectItem } from '@heroui/react';
import { useState, useTransition } from 'react';

const initialState = {
  name: '',
  category: '',
  unit: '',
  pricePerUnit: null as number | null,
  description: '',
};

export default function IngredientsForm() {
  const [formData, setFormData] = useState(initialState);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { ingredients, addIngredient } = useIngredientsStore();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await addIngredient(formData);
      const storeError = useIngredientsStore.getState().error;

      if (storeError) {
        setError('Ошибка базы данных');
        alert(storeError);
      } else {
        setError(null);
        setFormData(initialState);
        alert('Ингридиент успешно создан');
      }
    });
  };

  return (
    <>
      <Form className="w-full" action={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
              defaultSelectedKeys={''}
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
              value={
                formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ''
              }
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
          <Button color="primary" type="submit" isLoading={isPending}>
            Добавить
          </Button>
        </div>
      </Form>

      <TableIngredients data={ingredients} />
    </>
  );
}
