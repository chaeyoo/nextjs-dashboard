interface DatePickerComponentProps {
  startDtId: string;
  startDtName: string;
  endDtId: string;
  endDtName: string;
  startDt?: string;
  endDt?: string;
  onStartChange?: (date: string) => void;
  onEndChange?: (date: string) => void;
}
export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  startDtId,
  startDtName,
  endDtId,
  endDtName,
  startDt: startDate,
  endDt: endDate,
  onStartChange,
  onEndChange,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <input
        type="date"
        id={startDtId}
        name={startDtName}
        value={startDate}
        // onChange={(e) => onStartChange(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
      />
      <input
        type="date"
        id={endDtId}
        name={endDtName}
        value={endDate}
        // onChange={(e) => onEndChange(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500"
      />
    </div>
  );
};
