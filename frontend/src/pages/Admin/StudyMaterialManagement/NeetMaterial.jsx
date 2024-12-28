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

const NeetMaterial = () => {
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredMaterial = jeeMaterial.filter((material) => {
    const standardMatches =
      selectedStandard === "All" || material.standard === selectedStandard;
    const subjectMatches =
      selectedSubject === "All" || material.subject === selectedSubject;
    return standardMatches && subjectMatches;
  });

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-x-3">
          <label className="block text-sm font-medium text-gray-700">
            Standard
          </label>
          <select
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All Standards</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="flex items-center gap-x-3">
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="All">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">biology</option>
          </select>
        </div>
      </div>
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
          {filteredMaterial.map((material, index) => (
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
      </Table>
    </div>
  );
};

export default NeetMaterial;
