export interface LeaveInterface {
  employeeId: string;
  leaveType: "selectedHours" | "fullDay" | "SeveralDays";
  startDate: number;
  endDate: number;
  dateActioned?: string;
  approvedBy?: string;
  approved?: boolean;
  cancelled?: boolean;
  reason: string;
  _id?: string
}

export type PartialNull<T> = {
  [P in keyof T]?: T[P];
};
