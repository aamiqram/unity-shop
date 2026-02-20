"use client";
import { FiCheck, FiClock } from "react-icons/fi";

export default function OrderTimeline({ timeline }) {
  const getStageIcon = (status) => {
    if (status === "completed") return <FiCheck className="text-white" />;
    if (status === "current") return <FiClock className="text-orange" />;
    return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
  };

  const getStageColor = (status) => {
    if (status === "completed") return "bg-green-500";
    if (status === "current") return "bg-orange border-2 border-orange/30";
    return "bg-gray-300";
  };

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-gray-200"></div>

      <div className="space-y-6 relative">
        {timeline.map((stage, index) => (
          <div key={index} className="flex items-start">
            <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${getStageColor(stage.status)}`}
              >
                {stage.status === "completed" && (
                  <FiCheck className="text-white text-xs" />
                )}
              </div>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <p className="font-medium capitalize">
                  {stage.stage.replace(/_/g, " ")}
                </p>
                {stage.timestamp && (
                  <span className="text-xs text-gray-500">
                    {stage.timestamp}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{stage.description}</p>
              {stage.location && (
                <p className="text-xs text-gray-400 mt-1">{stage.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
