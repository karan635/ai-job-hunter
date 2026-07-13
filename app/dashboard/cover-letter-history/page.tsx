"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import CoverLetterHistoryCard from "@/components/cover-letter/CoverLetterHistoryCard";
import CoverLetterViewer from "@/components/cover-letter/CoverLetterViewer";

interface CoverLetter {
  id: string;
  company_name: string | null;
  job_title: string | null;
  content: string;
  created_at: string;
}

export default function CoverLetterHistoryPage() {
  const [letters, setLetters] = useState<CoverLetter[]>([]);
  const [selectedLetter, setSelectedLetter] =
    useState<CoverLetter | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/cover-letter-history");
        if (!res.ok) {
          throw new Error("Failed to fetch cover letters");
        }

        const data = await res.json();
        setLetters(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    fetchHistory();
  }, []);

  async function copyLetter(content: string) {
    await navigator.clipboard.writeText(content);
    alert("Copied!");
  }

  function downloadLetter(letter: CoverLetter) {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Cover Letter", 20, 20);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(letter.content, 170);

    doc.text(lines, 20, 35);

    doc.save(
      `${letter.company_name ?? "cover-letter"}.pdf`
    );
  }

  async function deleteLetter(id: string) {
    const confirmDelete = window.confirm("Are you sure you want to delete this cover letter?");
    if (!confirmDelete) return;
    try {
        const response = await fetch(`/api/cover-letter-history/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== id));
        alert("Cover letter deleted successfully!");
    } catch (error) {
        console.error(error);
        alert("Failed to delete cover letter.");
    }
}

  if (loading) {
    return (
      <div className="text-center py-20 text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          📄 Cover Letter History
        </h1>

        <p className="mt-2 text-zinc-400">
          View all your generated cover letters.
        </p>
      </div>

      {letters.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 p-12 text-center text-zinc-400">
          No cover letters found.
        </div>
      ) : (
        <div className="space-y-6">
          {letters.map((letter) => (
            <CoverLetterHistoryCard
              key={letter.id}
              companyName={letter.company_name ?? ""}
              jobTitle={letter.job_title ?? ""}
              createdAt={letter.created_at}
              onView={() => setSelectedLetter(letter)}
              onCopy={() => copyLetter(letter.content)}
              onDownload={() => downloadLetter(letter)}
              onDelete={() => deleteLetter(letter.id)}
            />
          ))}
        </div>
      )}

      {selectedLetter && (
        <CoverLetterViewer
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedLetter(null);
            }
          }}
          title={`${selectedLetter.company_name ?? "Company"} • ${
            selectedLetter.job_title ?? "Role"
          }`}
          content={selectedLetter.content}
        />
      )}
    </div>
  );
}