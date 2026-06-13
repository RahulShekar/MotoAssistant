import React from "react";

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-orange-400 uppercase tracking-wider">{subtitle}</div>
          <h1 className="text-2xl font-bold mt-1">{title}</h1>
        </div>

        {right ? <div className="ml-4">{right}</div> : null}
      </div>
    </div>
  );
}
