import { IRecipe } from '@/actions/recipe';
import { useIngredientsStore } from '@/store/ingredients-store';
import { useRecipeStore } from '@/store/recipe-store';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button, Select, SelectItem } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface RecipeFromProps {
  initialRecipe?: IRecipe;
}

interface IIngredientField {
  id: number;
  ingredientId: string;
  quantity: number | null;
}

const initialState = {
  name: '',
  description: '',
  imageUrl: '',
};

export default function RecipeForm({ initialRecipe }: RecipeFromProps) {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: initialRecipe?.name || initialState.name,
    description: initialRecipe?.description || initialState.description,
    imageUrl: initialRecipe?.imageUrl || initialState.imageUrl,
  });

  const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
    initialRecipe?.ingredients
      ? initialRecipe.ingredients.map((ingredient, index) => ({
          id: index,
          ingredientId: ingredient.ingredientId,
          quantity: ingredient.quantity,
        }))
      : [{ id: 0, ingredientId: '', quantity: null }]
  );

  const { ingredients } = useIngredientsStore();
  const { addRecipe, updateRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAddIngredientField = () => {
    setIngredientFields([
      ...ingredientFields,
      { id: ingredientFields.length, ingredientId: '', quantity: null },
    ]);
  };

  const handleRemoveIngredientField = (id: number) => {
    if (ingredientFields.length > 1) {
      setIngredientFields(ingredientFields.filter((field) => field.id !== id));
    }
  };

  const handleIngredientChange = (
    id: number,
    field: keyof IIngredientField,
    value: string | number | null
  ) => {
    setIngredientFields(
      ingredientFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      const result = initialRecipe
        ? await updateRecipe(initialRecipe.id, formData)
        : await addRecipe(formData);
      if (result.success) {
        setIngredientFields([{ id: 0, ingredientId: '', quantity: null }]);
        router.push('/');
        setFormData(initialState);
      } else {
        setError(result.error || 'Ошибка при создании рецепта');
      }
    });
  };

  return (
    <Form action={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}

      <Input
        isRequired
        name="name"
        placeholder="Название рецепта"
        type="text"
        value={formData.name}
        classNames={{
          innerWrapper: 'bg-default-100',
          input: 'border-2 border-default-300 rounded-md p-2',
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => (!value ? 'Название обязательно' : null)}
      />

      <Input
        name="description"
        placeholder="Описание рецепта (необязательно)"
        type="text"
        classNames={{
          innerWrapper: 'bg-default-100',
          input: 'border-2 border-default-300 rounded-md p-2',
        }}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <Input
        name="imageUrl"
        placeholder="Url изображения (необязательно)"
        type="url"
        classNames={{
          innerWrapper: 'bg-default-100',
          input: 'border-2 border-default-300 rounded-md p-2',
        }}
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />

      <div className="space-y-2 w-full">
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <Select
              isRequired
              name={`ingredient_${index}`}
              placeholder="выберите ингредиент"
              selectedKeys={field.ingredientId ? [field.ingredientId] : []}
              classNames={{
                trigger: 'bg-default-100 w-full',
                innerWrapper: 'text-sm',
                value: 'truncate',
                selectorIcon: 'text-black',
              }}
              onChange={(e) =>
                handleIngredientChange(field.id, 'ingredientId', e.target.value)
              }
            >
              {ingredients.map((ingredient) => (
                <SelectItem key={ingredient.id} className="text-black">
                  {ingredient.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              isRequired
              name={`quantity_${index}`}
              placeholder="Количество"
              type="number"
              classNames={{
                innerWrapper: 'bg-default-100',
                input: 'border-2 border-default-300 rounded-md p-2',
              }}
              value={field.quantity !== null ? field.quantity.toString() : ''}
              onChange={(e) =>
                handleIngredientChange(
                  field.id,
                  'quantity',
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
              validate={(value) =>
                !value || parseFloat(value) === 0 ? 'Количество обязательно' : null
              }
            />
            {ingredientFields.length > 1 && (
              <Button
                color="danger"
                variant="light"
                onPress={() => handleRemoveIngredientField(field.id)}
                className="w-[50px]"
              >
                -
              </Button>
            )}
            {ingredientFields.length < 10 && (
              <Button color="primary" variant="flat" onPress={handleAddIngredientField}>
                +
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full items-center justify-end mt-4">
        <Button color="primary" type="submit" isLoading={isPending}>
          {initialRecipe ? 'Сохранить изменения' : 'Создать рецепт'}
        </Button>
      </div>
    </Form>
  );
}
