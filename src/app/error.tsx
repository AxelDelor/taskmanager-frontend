"use client";

import { useEffect } from "react";

export default function Error({ error, retry }: { error: Error; retry: () => void }) {
  useEffect(() => {
    console.error(error);
    console.log(typeof retry);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button className="btn" onClick={() => retry()}>
        Try again
      </button>
    </div>
  );
}
