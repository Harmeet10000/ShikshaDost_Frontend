import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

const jeeMaterial = [
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "physics",
    Download_link: "dsnflasd dfbKSDrd",
  },
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "physics",
    Download_link: "dsnflasd dfbKSDrd",
  },
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "physics",
    Download_link: "dsnflasd dfbKSDrd",
  },
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "physics",
    Download_link: "dsnflasd dfbKSDrd",
  },
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "physics",
    Download_link: "dsnflasd dfbKSDrd",
  },
];

const CuetMaterial = () => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sr. No.</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Standard</TableHead>
          <TableHead className="text-right">Chapter</TableHead>
          <TableHead className="text-right">Topic</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jeeMaterial.map((material, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{material.subject}</TableCell>
            <TableCell>{material.standard}</TableCell>
            <TableCell className="text-right">{material.chapter}</TableCell>
            <TableCell className="text-right">{material.topic}</TableCell>
            <TableCell className="text-right">
              <a href={material.Download_link}>view</a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
};

export default CuetMaterial;
