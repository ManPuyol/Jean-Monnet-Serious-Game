import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { nombre: "Tema1", descripcion: "blablabla" },
  { nombre: "Tema2", descripcion: "blablabla" },
  { nombre: "Tema3", descripcion: "blablabla" },
  { nombre: "Tema4", descripcion: "blablabla" },
  { nombre: "Tema5", descripcion: "blablabla" }
];

export default function Teacher() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
