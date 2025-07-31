"use client";
import React from "react";

export default function Spinner() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="spinner">
        <div className="white" />
        <div className="black" />
        <div className="white" />
        <div className="black" />

        <style jsx>{`
          .spinner {
            position: relative;
            width: 40px;
            height: 40px;
            animation: rotateSpinner 0.3s infinite linear;
          }
          .black {
            background: #000000;
          }
          .white {
            background: #f0b511;
          }
          .spinner div {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            margin: -5px;
            border-radius: 50%;
            transform-origin: center center;
            animation: pulseDot 0.75s infinite ease-in-out;
          }
          .spinner div:nth-child(1) {
            --angle: 0deg;
          }
          .spinner div:nth-child(2) {
            --angle: 90deg;
          }
          .spinner div:nth-child(3) {
            --angle: 180deg;
          }
          .spinner div:nth-child(4) {
            --angle: 270deg;
          }

          @keyframes rotateSpinner {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes pulseDot {
            0%,
            100% {
              transform: rotate(var(--angle)) translateY(30px);
            }
            50% {
              transform: rotate(var(--angle)) translateY(10px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
