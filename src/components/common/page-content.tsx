'use client';
import { pageContent } from '@/config/config';
import { usePathname } from 'next/navigation';

export default function PageContent() {
  const pathName = usePathname();

  const content = pageContent[pathName as keyof typeof pageContent];

  if (!content) {
    return 'Content not found';
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          {content.contentTitle}
        </h2>
        <div className="h-1 w-24 bg-amber-500 mx-auto mt-2"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
        <div className="p-8 md:p-10">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
            {content.about}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {content.list.map((item, index) => (
              <div className="flex items-start space-x-4" key={index}>
                <div className="mt-1 bg-amber-100 rounded-full p-2">
                  <svg
                    className="w-5 h-5 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5 mb-4">
            <p className="text-gray-700 font-medium italic text-lg">{content.slogan}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
