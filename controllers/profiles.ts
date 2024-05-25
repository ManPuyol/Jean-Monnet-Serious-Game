"use server"

import { getUser } from "@/lib/utils";
import { NextResponse } from "next/server";

export const getDataForProfile = async () => {
    const user = await getUser();

    if (!user){
        NextResponse.json("Unable to find user");
    }
    
    const nameParts = user?.user_metadata.full_name.trim().split(' ');

    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1].charAt(0).toUpperCase();
    const fullNameInitials = firstNameInitial + lastNameInitial;

    return {
        nameInitials: fullNameInitials,
    }
}