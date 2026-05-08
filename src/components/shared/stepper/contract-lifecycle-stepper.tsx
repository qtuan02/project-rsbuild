import { Check } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface ContractLifecycleStepperProps {
  steps: Step[];
}

export const ContractLifecycleStepper = ({
  steps,
}: ContractLifecycleStepperProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step.id} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all ${
                  step.isCompleted
                    ? "border-green-500 bg-green-500 text-white"
                    : step.isActive
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-gray-50 text-gray-400"
                }`}
              >
                {step.isCompleted ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              {!isLast && (
                <div
                  className={`h-12 w-0.5 ${
                    steps[index + 1]?.isCompleted
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            <div className="pb-8 pt-0.5 flex-1">
              <h4
                className={`font-semibold transition-colors ${
                  step.isCompleted || step.isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </h4>
              {step.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
