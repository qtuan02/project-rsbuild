import { useMemo, useState } from "react";

import { getContracts } from "../data/contract.repository";

import type { ChecklistItem } from "../components/liquidation-checklist";

const initialChecklistItems: ChecklistItem[] = [
  {
    id: "asset-check",
    title: "Kiểm tra tài sản",
    description: "Kiểm tra điều kiện phòng, nội thất và trang thiết bị",
    isCompleted: false,
  },
  {
    id: "settle-utilities",
    title: "Thanh toán tiện ích",
    description: "Thanh toán hóa đơn điện nước còn nợ",
    isCompleted: false,
  },
  {
    id: "collect-keys",
    title: "Tập hợp chìa khóa",
    description: "Thu hồi chìa khóa phòng từ khách",
    isCompleted: false,
  },
  {
    id: "final-inspection",
    title: "Kiểm tra cuối cùng",
    description: "Xác nhận trạng thái phòng với khách",
    isCompleted: false,
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
      (checklistItems.filter((item) => item.isCompleted).length /
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
      isCompleted: currentStep > 1,
      isActive: currentStep === 1,
    },
    {
      id: "settle-fees",
      title: "Thanh toán phí",
      description: "Tính toán và thanh toán các khoản phí",
      isCompleted: currentStep > 2,
      isActive: currentStep === 2,
    },
    {
      id: "finalize",
      title: "Hoàn tất",
      description: "Xác nhận thanh lý và hoàn trả tiền đặt cọc",
      isCompleted: currentStep > 3,
      isActive: currentStep === 3,
    },
  ];

  const toggleChecklistItem = (itemId: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item,
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
