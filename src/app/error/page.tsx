'use client';
import { Button } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const message = searchParams.get('message') || 'Произошла ошибка';

  return (
    <>
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Что-то пошло не так</h1>

          <p className="text-gray-400 text-lg mb-8">{message}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onPress={() => {
                navigate.push('/');
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>Вернуться на главную</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
