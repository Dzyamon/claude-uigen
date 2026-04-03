import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocation } from "../ToolInvocation";
import type { ToolInvocation as AIToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

test("renders str_replace_editor with custom message", () => {
  const tool: AIToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: {},
    state: "result",
    result: "Success",
  };
  render(<ToolInvocation tool={tool} />);
  expect(screen.getByText("Edited a file")).toBeDefined();
});

test("renders generic tool name", () => {
  const tool: AIToolInvocation = {
    toolCallId: "2",
    toolName: "some_other_tool",
    args: {},
    state: "call",
  };
  render(<ToolInvocation tool={tool} />);
  expect(screen.getByText("some_other_tool")).toBeDefined();
});

test("shows loading indicator when state is not result", () => {
  const tool: AIToolInvocation = {
    toolCallId: "call_1",
    toolName: "str_replace_editor",
    args: {},
    state: "call",
  };
  const { container } = render(<ToolInvocation tool={tool} />);
  expect(container.querySelector(".animate-spin")).not.toBeNull();
});

test("does not show loading indicator when state is result", () => {
  const tool: AIToolInvocation = {
    toolCallId: "call_1",
    toolName: "str_replace_editor",
    args: {},
    state: "result",
    result: "foo",
  };
  const { container } = render(<ToolInvocation tool={tool} />);
  expect(container.querySelector(".animate-spin")).toBeNull();
});
