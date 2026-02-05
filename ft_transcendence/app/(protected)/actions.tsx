'use server'
import { prisma } from '@/lib/prisma';

import {PageData} from '@/types/general'
export async function addPage(data : FormData){

    console.log("from Actions:", data)
    const page = {
        title
    }
    const result = prisma.page.create()
}