import { useState } from "react";

type Props = {
    name: string;
    inviteCode: string;
    plusOneAllowed: boolean;
};

export default function RsvpForm({ name, inviteCode, plusOneAllowed }: Props) {
    const [attending, setAttending] = useState<"yes" | "no" | null>(null);
    const [plusOne, setPlusOne] = useState<"yes" | "no" | null>(null);
    const [plusOneName, setPlusOneName] = useState("");

    const isValid =
        attending !== null &&
        (attending === "no" ||
            !plusOneAllowed ||
            (plusOne !== null &&
                (plusOne === "no" ||
                    (plusOne === "yes" && plusOneName.trim().length > 0))));

    return (
        <form
            method="POST"
            action="/api/rsvp"
            className="space-y-8 max-w-md"
        >
            {/* Guest */}
            <div>
                <p className="text-sm text-gray-500 mb-1">Guest</p>
                <p className="text-lg font-medium text-gray-800">{name}</p>
            </div>

            <input type="hidden" name="invite_code" value={inviteCode} />
            <input type="hidden" name="primary_name" value={name} />

            {/* Attending */}
            <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-gray-700 mb-2">
                    Will you be attending?
                </legend>

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 cursor-pointer hover:border-pink-500 transition">
                    <input
                        type="radio"
                        name="primary_attending"
                        value="yes"
                        onChange={() => setAttending("yes")}
                        required
                        className="accent-pink-600"
                    />
                    <span className="text-gray-800">Yes, happily!</span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 cursor-pointer hover:border-pink-500 transition">
                    <input
                        type="radio"
                        name="primary_attending"
                        value="no"
                        onChange={() => {
                            setAttending("no");
                            setPlusOne(null);
                            setPlusOneName("");
                        }}
                        className="accent-pink-600"
                    />
                    <span className="text-gray-800">Sadly no</span>
                </label>
            </fieldset>

            {/* Plus one */}
            {attending === "yes" && plusOneAllowed && (
                <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-gray-700 mb-2">
                        Will you be bringing a plus one?
                    </legend>

                    <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 cursor-pointer hover:border-pink-500 transition">
                        <input
                            type="radio"
                            name="plus_one_attending"
                            value="yes"
                            onChange={() => setPlusOne("yes")}
                            required
                            className="accent-pink-600"
                        />
                        <span className="text-gray-800">Yes</span>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 cursor-pointer hover:border-pink-500 transition">
                        <input
                            type="radio"
                            name="plus_one_attending"
                            value="no"
                            onChange={() => {
                                setPlusOne("no");
                                setPlusOneName("");
                            }}
                            className="accent-pink-600"
                        />
                        <span className="text-gray-800">No</span>
                    </label>

                    {plusOne === "yes" && (
                        <input
                            type="text"
                            name="plus_one_name"
                            placeholder="Plus one's name"
                            value={plusOneName}
                            onChange={(e) => setPlusOneName(e.target.value)}
                            required
                            className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    )}
                </fieldset>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={!isValid}
                className={`w-full rounded-lg py-3 font-semibold transition ${isValid
                        ? "bg-pink-600 text-white hover:bg-pink-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Submit RSVP
            </button>
        </form>
    );
}
