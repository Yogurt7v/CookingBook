import prisma from '@/utils/prisma';
import registerUser from './register-user';

export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return { success: true, recipes };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Ошибка загрузки рецептов из базы' };
  }
}

export async function createRecipe(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const ingredients = Array.from(formData.entries())
      .filter(([key]) => key.startsWith('ingredient_'))
      .map(([key, value]) => ({
        ingredientId: value as string,
        quantity: parseFloat(formData.get(`quantity_${key.split('_')[1]}`) as string),
      }));

    if (!name || ingredients.length === 0) {
      return { success: false, error: 'Нужен хотя бы один ингридиент' };
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        imageUrl,
        ingredients: {
          create: ingredients,
        },
      },
    });

    return { success: true, recipe };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Ошибка создания рецепта' };
  }
}
