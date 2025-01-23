import React, { useState } from "react";
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
    standard: "12",
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
    standard: "12",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "chemistry",
    Download_link: "dsnflasd dfbKSDrd",
  },
  {
    standard: "11",
    chapter: "lorem",
    topic: "lorem2kjdfk",
    subject: "biology",
    Download_link: "dsnflasd dfbKSDrd",
  },
];

const NeetMaterial = ({ neetStudyMaterial ,error}) => {
  const [filters, setFilters] = useState({ standard: "all", subject: "all" });

  const standards = ["11", "12"];
  const subjects = ["physics", "biology", "chemistry"];

 
  const filteredMaterials = neetStudyMaterial.filter(
    (material) =>
      (filters.standard === "all" || material.class === filters.standard) &&
      (filters.subject === "all" || material.subject === filters.subject)
  );
  

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-x-3">
          <label className="block text-sm font-medium text-gray-700">
            Standard
          </label>
          <select
            name="standard"
            value={filters.standard}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All</option>
            {standards.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-x-3">
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <Table>
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
        {error ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : filteredMaterials.length > 0 ? (
            filteredMaterials.map((material, index) => (
              <TableRow key={material._id || index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{material.subject}</TableCell>
                <TableCell>{material.class}</TableCell>
                <TableCell className="text-right">{material.chapter}</TableCell>
                <TableCell className="text-right">{material.topicName}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={material.S3url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No materials found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NeetMaterial;
