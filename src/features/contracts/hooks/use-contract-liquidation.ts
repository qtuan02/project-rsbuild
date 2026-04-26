import { useMemo, useState } from "react";

import { getContracts } from "../data/contract.repository";

import type { ChecklistItem } from "../components/liquidation-checklist";

const initialChecklistItems: ChecklistItem[] = [
  {
    id: "asset-check",
    title: "Kiểm tra tài sản",
    description: "Kiểm tra điều kiện phòng, nội thất và trang thiết bị",
    completed: false,
  },
  {
    id: "settle-utilities",
    title: "Thanh toán tiện ích",
    description: "Thanh toán hóa đơn điện nước còn nợ",
    completed: false,
  },
  {
    id: "collect-keys",
    title: "Tập hợp chìa khóa",
    description: "Thu hồi chìa khóa phòng từ khách",
    completed: false,
  },
  {
    id: "final-inspection",
    title: "Kiểm tra cuối cùng",
    description: "Xác nhận trạng thái phòng với khách",
    completed: false,
  },
];

export const useContractLiquidation = (contractId: string) => {
  const contract = getContracts().find((item) => item.id === contractId);
  const [currentStep, setCurrentStep] = useState(1);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    initialChecklistItems,
  );

  const checklistCompletion = useMemo(
    () =>
      (checklistItems.filter((item) => item.completed).length /
        checklistItems.length) *
      100,
    [checklistItems],
  );

  const canProceedToSettlement = checklistCompletion === 100;

  const settlementSummary = {
    depositAmount: contract?.depositAmount || 2000000,
    outstandingFees: 500000,
    refundAmount: 0,
    penaltyAmount: 300000,
  };

  const steps = [
    {
      id: "check-assets",
      title: "Kiểm tra tài sản",
      description: "Kiểm tra toàn bộ tài sản và điều kiện phòng",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: "settle-fees",
      title: "Thanh toán phí",
      description: "Tính toán và thanh toán các khoản phí",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      id: "finalize",
      title: "Hoàn tất",
      description: "Xác nhận thanh lý và hoàn trả tiền đặt cọc",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
  ];

  const toggleChecklistItem = (itemId: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return {
    contract,
    currentStep,
    setCurrentStep,
    checklistItems,
    canProceedToSettlement,
    settlementSummary,
    steps,
    toggleChecklistItem,
  };
};
