import { Loader2, FileEdit, Wrench } from "lucide-react";
import type { ToolInvocation as AIToolInvocation } from "ai";

interface ToolInvocationProps {
  tool: AIToolInvocation;
}

export function ToolInvocation({ tool }: ToolInvocationProps) {
  let message = tool.toolName;
  let Icon = Wrench;

  if (tool.toolName === "str_replace_editor") {
    message = "Edited a file";
    Icon = FileEdit;
  }

  const isComplete = tool.state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-sans border border-neutral-200">
      {isComplete ? (
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100">
          <Icon className="w-2.5 h-2.5 text-emerald-600" />
        </div>
      ) : (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700 font-medium">{message}</span>
    </div>
  );
}
