import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Testing from "./Testing.jsx";

test("First Test Case", () => {
    render(<Testing />);
    const heading = screen.getByText("Hello Test 2");
    expect(heading).toBeInTheDocument();
});