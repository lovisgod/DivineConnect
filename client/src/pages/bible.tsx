import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { get, set } from "idb-keyval"; // ✅ IndexedDB

type BibleData = {
  [book: string]: {
    [chapter: string]: {
      [verse: string]: string;
    };
  };
};

const BIBLE_VERSIONS: Record<string, string> = {
  KJV: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/KJV/KJV_bible.json",
  AMP: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/AMP/AMP_bible.json",
  WEB: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/WEB/WEB_bible.json",
  ASV: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/ASV/ASV_bible.json",
  NIV: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/NIV/NIV_bible.json",
  YLT: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/YLT/YLT_bible.json",
  ISV: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/ISV/ISV_bible.json",
  NKJV: "https://raw.githubusercontent.com/jadenzaleski/BibleTranslations/refs/heads/master/NKJV/NKJV_bible.json"
};

export default function BibleReader() {
  const [bibles, setBibles] = useState<Record<string, BibleData>>({});
  const [selectedVersion, setSelectedVersion] = useState<keyof typeof BIBLE_VERSIONS>("KJV");

  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");
  const [verseRange, setVerseRange] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const [showSelectors, setShowSelectors] = useState(true);

  // ✅ Load Bible from IndexedDB if available
  useEffect(() => {
    Object.keys(BIBLE_VERSIONS).forEach(async (ver) => {
      const saved = await get(`bible-${ver}`);
      if (saved) {
        setBibles((prev) => ({ ...prev, [ver]: saved as BibleData }));
      }
    });
  }, []);

  // ✅ Download and save into IndexedDB
  const downloadBible = async (version: string) => {
    try {
      const res = await fetch(BIBLE_VERSIONS[version]);
      const data: BibleData = await res.json();
      await set(`bible-${version}`, data);
      setBibles((prev) => ({ ...prev, [version]: data }));
      toast({ title: "Download Complete", description: `${version} Bible downloaded successfully.` });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: `Failed to download ${version} Bible.` });
    }
  };

  const fetchPassage = () => {
    const bible = bibles[selectedVersion];
    if (!bible || !selectedBook) return;

    const verses: string[] = [];

    if (selectedBook && !selectedChapter) {
      // Whole book
      const chapters = bible[selectedBook];
      Object.keys(chapters).forEach((ch) => {
        Object.keys(chapters[ch]).forEach((v) => {
          verses.push(`${selectedBook} ${ch}:${v} - ${chapters[ch][v]}`);
        });
      });
    } else if (selectedBook && selectedChapter && !selectedVerse) {
      // Whole chapter
      const versesObj = bible[selectedBook]?.[selectedChapter];
      if (versesObj) {
        Object.keys(versesObj).forEach((v) => {
          verses.push(`${selectedBook} ${selectedChapter}:${v} - ${versesObj[v]}`);
        });
      }
    } else if (selectedBook && selectedChapter && selectedVerse) {
      const versesObj = bible[selectedBook]?.[selectedChapter];
      if (versesObj) {
        if (verseRange) {
          const [start, end] = verseRange.split("-").map(Number);
          for (let i = start; i <= end; i++) {
            if (versesObj[i]) {
              verses.push(`${selectedBook} ${selectedChapter}:${i} - ${versesObj[i]}`);
            }
          }
        } else {
          const verseText = versesObj[selectedVerse];
          if (verseText) {
            verses.push(`${selectedBook} ${selectedChapter}:${selectedVerse} - ${verseText}`);
          }
        }
      }
    }

    setOutput(verses);
  };

  useEffect(() => {
    if (selectedBook) fetchPassage();
  }, [selectedVersion]);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-center mb-6">📖 Bible Reader</h1>

      {/* Toggle selectors */}
      <button
        onClick={() => setShowSelectors(!showSelectors)}
        className="w-full flex items-center justify-between bg-gray-200 px-4 py-2 rounded-lg mb-4 hover:bg-gray-300"
      >
        <span className="font-medium">Passage Selector</span>
        {showSelectors ? <ChevronUp /> : <ChevronDown />}
      </button>

      {showSelectors && (
        <div className="space-y-4">
          {/* Version selector */}
          <div>
            <label className="block mb-1 font-medium">Version</label>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value as keyof typeof BIBLE_VERSIONS)}
              className="w-full border p-2 rounded"
            >
              {Object.keys(BIBLE_VERSIONS).map((ver) => (
                <option key={ver} value={ver}>
                  {ver}
                </option>
              ))}
            </select>
            {!bibles[selectedVersion] && (
              <button
                onClick={() => downloadBible(selectedVersion)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Download {selectedVersion}
              </button>
            )}
          </div>

          {/* Book selector */}
          <div>
            <label className="block mb-1 font-medium">Book</label>
            <select
              value={selectedBook}
              disabled={!bibles[selectedVersion]}
              onChange={(e) => {
                setSelectedBook(e.target.value);
                setSelectedChapter("");
                setSelectedVerse("");
              }}
              className={`w-full border p-2 rounded ${!bibles[selectedVersion] ? "bg-gray-200 cursor-not-allowed" : ""}`}
            >
              <option value="">-- Select Book --</option>
              {bibles[selectedVersion] &&
                Object.keys(bibles[selectedVersion]).map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
            </select>
          </div>

          {/* Chapter selector */}
          <div>
            <label className="block mb-1 font-medium">Chapter</label>
            <select
              value={selectedChapter}
              disabled={!bibles[selectedVersion] || !selectedBook}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setSelectedVerse("");
              }}
              className={`w-full border p-2 rounded ${
                !bibles[selectedVersion] || !selectedBook ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            >
              <option value="">-- Whole Book / Select Chapter --</option>
              {bibles[selectedVersion]?.[selectedBook] &&
                Object.keys(bibles[selectedVersion][selectedBook]).map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
            </select>
          </div>

          {/* Verse selector */}
          <div>
            <label className="block mb-1 font-medium">Verse</label>
            <select
              value={selectedVerse}
              disabled={!bibles[selectedVersion] || !selectedBook || !selectedChapter}
              onChange={(e) => setSelectedVerse(e.target.value)}
              className={`w-full border p-2 rounded ${
                !bibles[selectedVersion] || !selectedBook || !selectedChapter
                  ? "bg-gray-200 cursor-not-allowed"
                  : ""
              }`}
            >
              <option value="">-- Whole Chapter / Select Verse --</option>
              {bibles[selectedVersion]?.[selectedBook]?.[selectedChapter] &&
                Object.keys(bibles[selectedVersion][selectedBook][selectedChapter]).map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          </div>

          {/* Range input */}
          {selectedVerse && (
            <div>
              <label className="block mb-1 font-medium">Verse Range (optional)</label>
              <input
                type="text"
                placeholder="e.g. 3-10"
                value={verseRange}
                onChange={(e) => setVerseRange(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <button
              onClick={fetchPassage}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Passage
            </button>
          </div>
        </div>
      )}

      {output.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg h-96 overflow-y-scroll space-y-2">
          {output.map((line, i) => (
            <p key={i} className="text-base">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
