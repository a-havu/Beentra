import { prisma } from "@/lib/prisma";
import DisplayFeaturedProjects from "./DisplayFeaturedProjects";

export default async function FeaturedProjects() {    
    const projects = await prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
		include: {creator: { select: { username: true }}}
    });
    return <DisplayFeaturedProjects projects={projects} />;
}