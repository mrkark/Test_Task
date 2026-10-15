"use client";

import React from "react";

interface CoffeeBeanRatingProps {
  rating: number; // e.g. 5, 4.8
  max?: number;
  reviewsCount?: number;
  size?: number;
  className?: string;
  showScore?: boolean;
}

export function CoffeeBeanRating({
  rating = 5,
  max = 5,
  reviewsCount,
  size = 18,
  className = "",
  showScore = true,
}: CoffeeBeanRatingProps) {
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* 5 Coffee Beans Rating Display */}
      <div className="flex items-center gap-1" title={`Оценка: ${rating} из ${max} зёрен`}>
        {Array.from({ length: max }).map((_, i) => {
          const isFilled = i < Math.floor(rating);
          const isHalf = !isFilled && i < rating;

          return (
            <svg
              key={i}
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-200 hover:scale-110"
              aria-hidden="true"
            >
              {/* Coffee bean outer shape */}
              <path
                d="M12 2C17.5 2 21.5 6 21.5 12C21.5 18 17.5 22 12 22C6.5 22 2.5 18 2.5 12C2.5 6 6.5 2 12 2Z"
                className={
                  isFilled
                    ? "fill-bean-crack dark:fill-bean-dark-accent"
                    : isHalf
                    ? "fill-bean-chaff dark:fill-bean-chaff opacity-80"
                    : "fill-transparent stroke-bean-border dark:stroke-bean-dark-border"
                }
                strokeWidth={isFilled ? "0" : "1.8"}
              />

              {/* Coffee bean signature center crack / furrow */}
              <path
                d="M12 4.5C10.5 7.5 13.5 10 11.5 12.5C9.5 15 13 17.5 12 20"
                stroke={isFilled ? "#F9F6F0" : "currentColor"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isFilled ? "opacity-95" : "text-bean-border dark:text-bean-dark-border opacity-70"}
              />
            </svg>
          );
        })}
      </div>

      {/* Score Text & Review Count */}
      {showScore && (
        <span className="font-mono text-xs text-bean-muted dark:text-bean-dark-muted flex items-center gap-1">
          <strong className="text-bean-espresso dark:text-bean-dark-text font-bold">
            {roundedRating.toFixed(1)}
          </strong>
          {reviewsCount && (
            <span className="text-[11px] opacity-80">
              ({reviewsCount} {getReviewsDeclension(reviewsCount)})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

function getReviewsDeclension(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 19) return "отзывов";
  const last = n % 10;
  if (last === 1) return "отзыв";
  if (last >= 2 && last <= 4) return "отзыва";
  return "отзывов";
}
