import {
  CreateIngredient,
  deleteIngredient,
  getAllIngredients,
} from '@/actions/ingredient';
import { Category, Unit } from '@/generated/prisma';
import { ZodError } from 'zod';
import { create } from 'zustand';

interface IIngredient {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  pricePerUnit: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IIngredientsState {
  ingredients: IIngredient[];
  isLoading: boolean;
  error: string | null;
  loadIngredients: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngredients: (id: string) => Promise<void>;
}

export const useIngredientsStore = create<IIngredientsState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await getAllIngredients();
      if (response.success) {
        set({
          ingredients: response.allIngredients,
          isLoading: false,
        });
      } else {
        set({
          error:
            typeof response.error === 'string' ? response.error : 'Неизвестная ошибка',
          isLoading: false,
        });
      }
    } catch {
      set({ error: 'Ошибка при загрузке данных', isLoading: false });
    }
  },

  addIngredient: async (formdata: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await CreateIngredient(formdata);

      if (response.success && response.newIngredient) {
        set((state) => ({
          ingredients: [...state.ingredients, response.newIngredient],
          isLoading: false,
        }));
      } else if (!response.success && response.error) {
        // Обработка Zod ошибки или другой ошибки
        const errorMessage =
          response.error instanceof ZodError
            ? 'Неверные данные ингредиента'
            : 'Ошибка при добавлении ингредиента';

        set({
          error: errorMessage,
          isLoading: false,
        });
      } else {
        set({
          error: 'Неизвестная ошибка',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Ошибка при добавлении ингредиента',
        isLoading: false,
      });
    }
  },

  removeIngredients: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await deleteIngredient(id);
      if (response.success) {
        set((state) => ({
          ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
          isLoading: false,
        }));
      } else {
        set({
          error:
            typeof response.error === 'string' ? response.error : 'Неизвестная ошибка',
          isLoading: false,
        });
      }
    } catch {
      set({ error: 'Ошибка при удалении ингредиента', isLoading: false });
    }
  },
}));
