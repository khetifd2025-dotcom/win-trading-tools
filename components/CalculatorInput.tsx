"use client";

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "number" | "text";
  step?: string;
  min?: string;
  placeholder?: string;
};

export default function CalculatorInput({
  label,
  value,
  onChange,
  type = "number",
  step = "any",
  min,
  placeholder
}: Props) {
  return (
    <label className="grid gap-2 text-sm text-zinc-300">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
        type={type}
        step={step}
        min={min}
        placeholder={placeholder}
      />
    </label>
  );
}
