import { prisma } from '@/lib/prisma';

interface InfoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { id } = await params;
  
  try {
    const result = await prisma.page.findUnique({
      where: { 
        id: Number(id),
      }
    });

    return (
      <div>
        <h1>Welcome to my page</h1>
        {result ? <p>{result.title}</p> : <p>Page not found</p>}
      </div>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    return (
      <div>
        <h1>Welcome to my page</h1>
        <p>Error loading page</p>
      </div>
    );
  }
}