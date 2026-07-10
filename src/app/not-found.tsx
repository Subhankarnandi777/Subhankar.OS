'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [text, setText] = useState('');
  const fullText = `> ERROR 404: RESOURCE NOT FOUND
> Location: /dev/null
> 
> The requested application or directory does not exist in this OS.
> Please return to the main interface.
>
> Re-initializing connection...`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-black text-green-500 font-mono p-8 flex flex-col items-start justify-center">
      <div className="max-w-2xl">
        <pre className="whitespace-pre-wrap mb-8 text-lg">{text}</pre>
        {text.length >= fullText.length && (
          <Link href="/" className="inline-block px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors animate-pulse">
            [ RUN reboot.sh ]
          </Link>
        )}
      </div>
    </div>
  );
}
