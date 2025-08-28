'use server';
import { Category, Unit } from '@/generated/prisma';
import { ingredientSchema } from '@/schema/zod';
import prisma from '@/utils/prisma';
import z from 'zod';

export async function CreateIngredient(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as Category,
      unit: formData.get('unit') as Unit,
      pricePerUnit: formData.get('pricePerUnit')
        ? parseFloat(formData.get('pricePerUnit') as string)
        : null,
      description: formData.get('description') as string,
    };
    const validateData = ingredientSchema.parse(data);

    const newIngredient = await prisma.ingredient.create({
      data: {
        name: validateData.name,
        category: validateData.category,
        unit: validateData.unit,
        pricePerUnit: validateData.pricePerUnit,
        description: validateData.description,
      },
    });
    return { success: true, newIngredient };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return console.log('zod error', z.ZodError);
    }
    console.log('error', error);
  }
}

export async function getAllIngredients() {
  try {
    const allIngredients = await prisma.ingredient.findMany();
    return { success: true, allIngredients };
  } catch (error) {
    console.log('error', error);
    return { error: error };
  }
}

export async function deleteIngredient(id: string) {
  try {
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        id: id,
      },
    });
    return { success: true, deletedIngredient };
  } catch (error) {
    console.log('error', error);
    return { error: error };
  }
}
