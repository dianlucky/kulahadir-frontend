import { AttendanceRecapCard, HistoryMenu } from "../components";

export const HistoryPage: React.FC = () => {
  return (
    <>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <div>
        <div>
          <AttendanceRecapCard />
        </div>
        <div>
          <HistoryMenu />
        </div>
      </div>
    </>
  );
};
