import { useRecipeStore } from '@/store/recipe-store';
import { IRecipe } from '../../actions/recipe';
import { useTransition } from 'react';
import { UNIT_OPTIONS } from '@/constants/select-options';
import { Button, Card, CardBody, CardHeader, Image, Link } from '@heroui/react';

interface RecipeCardProps {
  recipe: IRecipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { removeRecipe } = useRecipeStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await removeRecipe(recipe.id);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_OPTIONS.find((option) => option.value === unit);
    return unitOption ? unitOption.label : unit.toLowerCase();
  };

  return (
    <Card className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt="Изображение"
            className="w-[300px] h-[200px] object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 text-sm">Нет изображения</span>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <h2 className="text-xl font-bold text-gray-800 truncate">{recipe.name}</h2>
      </CardHeader>

      <CardBody className="p-4 pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recipe.description}</p>
        <h3 className="font-semibold text-gray-700 mb-2">Ингредиенты:</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          {recipe.ingredients.map((i) => (
            <li key={i.id} className="flex flex-wrap items-baseline gap-x-1">
              <span className="font-medium">{i.ingredient.name}:</span>
              <span>{i.quantity}</span>
              <span>{getUnitLabel(i.ingredient.unit)}</span>
            </li>
          ))}
        </ul>
      </CardBody>

      <div className="p-4 pt-0 flex flex-wrap gap-2 justify-end">
        <Link href={`/recipe/${recipe.id}`}>
          <Button
            color="primary"
            variant="light"
            className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
          >
            Редактировать
          </Button>
        </Link>
        <Button
          color="danger"
          variant="light"
          onPress={handleDelete}
          isLoading={isPending}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
        >
          Удалить
        </Button>
      </div>
    </Card>
  );
}
