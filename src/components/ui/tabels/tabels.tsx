import { Category, Unit } from '@/generated/prisma';
import { useIngredientsStore } from '@/store/ingredients-store';

export interface IIngredient {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  pricePerUnit: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function TableIngredients({ data }: { data: IIngredient[] | [] }) {
  const { removeIngredients, isLoading } = useIngredientsStore();

  const handleDelete = async (id: string) => {
    await removeIngredients(id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 p-4">
      {data.map((ingredient) => (
        <div
          key={ingredient.id}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-5 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 relative group"
        >
          {/* Кнопка удаления */}
          <button
            onClick={() => handleDelete(ingredient.id)}
            disabled={isLoading}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            title="Удалить ингредиент"
          >
            <span>X</span>
          </button>
          {/* Основная информация в одну строку */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 flex-1">
              {/* Название */}
              <h3 className="text-lg font-semibold text-white truncate min-w-[120px]">
                {ingredient.name}
              </h3>

              {/* Категория и единица измерения */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30 whitespace-nowrap">
                  {ingredient.category}
                </span>
                <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30 whitespace-nowrap">
                  {ingredient.unit}
                </span>
              </div>

              {/* Цена */}
              <div className="flex-1 text-right">
                <span
                  className={`text-xl font-medium ${
                    ingredient.pricePerUnit ? 'text-green-300' : 'text-gray-400'
                  }`}
                >
                  {ingredient.pricePerUnit} ₽
                </span>
              </div>
            </div>
          </div>
          {/* Описание и дополнительная информация */}
          <div className="flex items-center justify-between">
            {/* Описание */}
            <div className="flex-1">
              {ingredient.description && (
                <p className="text-sm text-gray-300 line-clamp-1">
                  {ingredient.description}
                </p>
              )}
            </div>
          </div>
          {/* ID (маленьким текстом) */}

          {/* Индикатор загрузки при удалении
          {isDeleting === ingredient.id && (
            <div className="absolute inset-0 bg-gray-900/80 rounded-xl flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
