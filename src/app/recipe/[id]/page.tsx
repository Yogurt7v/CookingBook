import { IRecipe } from '@/actions/recipe';
import RecipeForm from '@/forms/recipe-form';
import { useRecipeStore } from '@/store/recipe-store';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const { recipes, isLoading, error } = useRecipeStore();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (recipes.length > 0 || error) {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe || null);
      setHasSearched(true);
    }
  }, [recipes, id, error]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  if (hasSearched && !recipe) {
    return <div className="text-center">Recipe not found</div>;
  }

  if (recipe) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Редактировать рецепт: {recipe.name}</h1>
        <RecipeForm initialRecipe={recipe} />
      </div>
    );
  }
}
