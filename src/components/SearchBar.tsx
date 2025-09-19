"use client";

import { useState, useEffect } from "react";
import { BookOpen, HelpCircle, ListChecks } from "lucide-react"; // Icônes Lucide

interface Suggestion {
  type: "course" | "quiz" | "quiz_question";
  category: string;
  id: string;
  title: string;
  highlightedTitle: string;
  courseId?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setShowDropdown(true);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Erreur suggestions:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 250);
    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query]);

  // Sélecteur d'icône selon type
  const renderIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "quiz":
        return <ListChecks className="w-4 h-4 text-green-500" />;
      case "quiz_question":
        return <HelpCircle className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        placeholder="Rechercher un cours, un quiz ou une question..."
        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <div className="absolute right-3 top-2 text-gray-400 text-xs">⏳</div>}

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto divide-y divide-gray-100">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              onClick={() => {
                if (s.type === "course") window.location.href = `/courses/${s.id}`;
                else if (s.type === "quiz") window.location.href = `/quiz/${s.id}`;
                else if (s.type === "quiz_question") window.location.href = `/quiz/${s.quizId}#q-${s.id}`;
              }}
            >
              {renderIcon(s.type)}
              <div className="flex flex-col">
                <span
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: s.highlightedTitle }}
                />
                <span className="text-[10px] uppercase tracking-wide text-gray-400">
                  {s.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
