"use client";
import React, { useState, useEffect } from "react";

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Initialize with a default value to prevent controlled/uncontrolled switch
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    }
    return false;
  });

  useEffect(() => {
    setMounted(true);
    // Apply theme to document on mount
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <div className="switch-wrapper">
        <label className="switch">
          <input type="checkbox" checked={isDark} readOnly />
          <span className="slider"></span>
        </label>
      </div>
    );
  }

  return (
    <div className="switch-wrapper">
      <label className="switch" htmlFor="theme-switch">
        <input
          type="checkbox"
          id="theme-switch"
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
      
      <style jsx>{`
        .switch-wrapper input[type="checkbox"] {
          visibility: hidden;
          display: none;
        }
        
        .switch-wrapper *,
        .switch-wrapper ::after,
        .switch-wrapper ::before {
          box-sizing: border-box;
        }
        
        .switch-wrapper .switch {
          --width-of-switch: 3.5em;
          --height-of-switch: 2em;
          --size-of-icon: 1.4em;
          --slider-offset: 0.3em;
          position: relative;
          width: var(--width-of-switch);
          height: var(--height-of-switch);
          display: inline-block;
          cursor: pointer;
        }
        
        .switch-wrapper .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #f4f4f5;
          transition: .4s;
          border-radius: 30px;
        }
        
        .switch-wrapper .slider:before {
          position: absolute;
          content: "";
          height: var(--size-of-icon, 1.4em);
          width: var(--size-of-icon, 1.4em);
          border-radius: 20px;
          left: var(--slider-offset, 0.3em);
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(40deg, #ffe69a, #fff3cd 70%);
          transition: .4s;
        }
        
        .switch-wrapper input:checked + .slider {
          background-color: #303136;
        }
        
        .switch-wrapper input:checked + .slider:before {
          left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
          background: #303136;
          box-shadow: inset -3px -2px 5px -2px #ffffff, inset -10px -4px 0 0 #fff;
        }
      `}</style>
    </div>
  );
}