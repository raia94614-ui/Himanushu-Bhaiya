import React from "react";

export const metadata = {
  title: "Student Portal | Himanshu Classes",
  description: "Access your courses, live classes, study materials, mock tests, and performance analytics.",
};

export default function StudentRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
