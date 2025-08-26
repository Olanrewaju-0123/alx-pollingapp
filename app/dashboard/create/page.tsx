"use client";
import { useState } from "react";

export default function CreatePollPage() {
  const [tab, setTab] = useState<"basic" | "settings">("basic");
  const [options, setOptions] = useState<string[]>(["Option 1", "Option 2"]);
  const [pollTitle, setPollTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [requireLogin, setRequireLogin] = useState<boolean>(true);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = (): void => {
    setOptions([...options, ""]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b bg-white">
        <h1 className="text-2xl font-bold text-black">ALX Polly</h1>
        <div className="flex items-center gap-4">
          <a
            href="/dashboard/polls"
            className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
          >
            My Polls
          </a>
          <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center font-bold text-black text-sm">
            U
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center gap-8 py-4 bg-white border-b">
        <a href="/dashboard/polls" className="font-bold text-black">
          My Polls
        </a>
        <a href="/dashboard/create" className="font-bold text-black">
          Create Poll
        </a>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-8 flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-2xl mb-8">
          <h2 className="text-2xl font-bold text-black">Create New Poll</h2>
          <button className="text-gray-600 hover:text-gray-800 font-medium">
            Cancel
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex w-full rounded-lg overflow-hidden bg-gray-100">
            <button
              onClick={() => setTab("basic")}
              className={`flex-1 py-3 text-center font-medium ${
                tab === "basic"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setTab("settings")}
              className={`flex-1 py-3 text-center font-medium ${
                tab === "settings"
                  ? "bg-white text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10 w-full">
            {tab === "basic" ? (
              <>
                <h3 className="font-bold mb-1 text-lg text-black">
                  Poll Information
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Enter the details for your new poll
                </p>
                <div className="mb-6">
                  <label className="block font-bold mb-2 text-black text-sm">
                    Poll Title
                  </label>
                  <input
                    type="text"
                    value={pollTitle}
                    onChange={(e) => setPollTitle(e.target.value)}
                    placeholder="Enter a question or title"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block font-bold mb-2 text-black text-sm">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide more context about your poll"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block font-bold mb-2 text-black text-sm">
                    Poll Options
                  </label>
                  {options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                  <button
                    onClick={addOption}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                  >
                    Add Option
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold mb-1 text-lg text-black">
                  Poll Settings
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Configure additional options for your poll
                </p>
                <div className="mb-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="multi"
                    checked={multiSelect}
                    onChange={(e) => setMultiSelect(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="multi" className="text-sm text-black">
                    Allow users to select multiple options
                  </label>
                </div>
                <div className="mb-6 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="login"
                    checked={requireLogin}
                    onChange={(e) => setRequireLogin(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="login" className="text-sm text-black">
                    Require users to be logged in to vote
                  </label>
                </div>
                <div className="mb-6">
                  <label className="block font-bold mb-2 text-black text-sm">
                    Poll End Date (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="dd/mm/yyyy, ---"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute right-3 top-2.5">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Create Poll Button */}
        <div className="flex justify-end w-full max-w-2xl mx-auto mt-8">
          <button className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800">
            Create Poll
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          © 2025 ALX Polly. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
