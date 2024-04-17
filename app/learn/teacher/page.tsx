"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

const initialData = [
  { nombre: "Asignatura 1", descripcion: "blablabla" },
  { nombre: "esta es la 2", descripcion: "blablabla" },
  { nombre: "la tercera", descripcion: "blablabla" },
  { nombre: "cuarrrta", descripcion: "blablabla" },
  { nombre: "y la ultima asignatura", descripcion: "blablabla" }
];

export default function Teacher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredData = initialData.filter(item =>
      item.nombre.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div>
      <Breadcrumb className="pl-3 py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/learn">Learn</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/learn/teacher">Teacher</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full flex-1 pl-2">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>
      <Table className="full">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">Nombre</TableHead>
            <TableHead className="hidden sm:table-cell">Descripcion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-accent" : ""}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell className="hidden sm:table-cell">{item.descripcion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
