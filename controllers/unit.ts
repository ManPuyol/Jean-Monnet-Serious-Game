"use server";
import { InsertUnit, units } from "@/schemas/units";
import { db } from "@/utils/drizzle/db";
import { eq } from "drizzle-orm";

export const addunit = async (unit: InsertUnit) => {
  await db.insert(units).values(unit);
};

export const allUnits = async () => {
  const data = await db.select().from(units);
  return data;
};

export const deleteUnit = async (id: number) => {
  await db.delete(units).where(eq(units.id, id));
};

export const updateUnit = async (id: number, unit: InsertUnit) => {
  await db
    .update(units)
    .set({
      ...unit,
      updatedAt: new Date().toDateString(),
    })
    .where(eq(units.id, id));
};