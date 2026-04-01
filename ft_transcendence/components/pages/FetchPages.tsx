import { prisma } from "@/lib/prisma";
import FunctionalButtons from "./FunctionalButtons";
import AddPage from "../dashboard/AddPage";

export default async function FetchPages() {
  const pages = await prisma.page.findMany({
    include: {
      author: {
        select: {
          username: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-2xl font-bold text-[#255a8b]">Pages Management</h2>
      </div>

      <div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Author
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Created
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {pages.length > 0 ? (
              pages.map((page, index) => (
                <tr
                  key={page.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="hidden md:table-cell px-6 py-4 text-center text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">
                    {page.title}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-center text-sm text-gray-600">
                    {page.author?.username || 'Unknown'}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-center text-sm text-gray-600">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <FunctionalButtons
                      id={page.id}
                      initialData={{ title: page.title, text: page.text }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No pages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
