import {
  AttendanceCardSection,
  DailyTaskSection,
  LocationCard,
} from "../components";

export const CheckLogPage: React.FC = () => {
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <div className="mb-2">
        <LocationCard />
      </div>
      <div className="mt-2">
        <AttendanceCardSection />
      </div>
      <div className="mt-2 mb-20">
        <DailyTaskSection />
      </div>
    </main>
  );
};
