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
    <Card>
      <div>
        {recipe.imageUrl ? (
          <div>
            <Image src={recipe.imageUrl} alt="Изображение" />
          </div>
        ) : (
          <div>
            <span>Нет изображения</span>
          </div>
        )}
      </div>

      <CardHeader>
        <h2>{recipe.name}</h2>
      </CardHeader>

      <CardBody>
        <p>{recipe.description}</p>
        <h3>Ингредиенты:</h3>
        <ul>
          {recipe.ingredients.map((i) => (
            <li key={i.id}>
              {i.ingredient.name}: {i.quantity} {getUnitLabel(i.ingredient.unit)}
            </li>
          ))}
        </ul>
      </CardBody>

      <div>
        <Link href={`/recipe/${recipe.id}`}>
          <Button color="primary" variant="light">
            Редактировать
          </Button>
        </Link>
        <Button
          color="danger"
          variant="light"
          onPress={handleDelete}
          isLoading={isPending}
        >
          Удалить
        </Button>
      </div>
    </Card>
  );
}
