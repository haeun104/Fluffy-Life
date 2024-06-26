import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fluffy Life - Event",
  description:
    "Join us for exciting dog events featuring fun activities, professional training sessions, and socialization opportunities.",
};

const EventPage = () => {
  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col gap-4 mx-auto">
        <h2 className="text-main-teal text-lg font-bold">Events</h2>
        <div>
          <h3 className="text-accent-light-green font-bold">Upcoming Events</h3>
          <p className="sm:text-center mt-10">Will be updated soon!</p>
        </div>
      </div>
    </Container>
  );
};

export default EventPage;
