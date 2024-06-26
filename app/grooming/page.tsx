import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import GroomingGallery from "@/components/grooming/GroomingGallery";
import GroomingReservation from "@/components/grooming/GroomingReservation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fluffy Life - Grooming",
  description:
    "Give your dog the ultimate grooming experience with our professional grooming services.",
};

export interface GroomingSearchParams {
  date?: Date;
  service?: string;
  startDate?: Date;
  endDate?: Date;
}

const GroomingPage = async ({
  searchParams,
}: {
  searchParams: GroomingSearchParams;
}) => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col gap-4 mx-auto">
        <h2 className="text-main-teal text-lg font-bold">Grooming</h2>
        <div>
          <h3 className="text-accent-light-green font-bold">
            Services included
          </h3>
          <p className="my-4">
            Bathing &middot; Brushing &middot; Haircut and Trimming &middot;
            Nail Clipping and Filing &middot; Ear Cleaning &middot; Paw Pad
            Trimming and Care &middot; Perfume or Cologne Application
          </p>
          <p className="text-sm">
            The service usually takes{" "}
            <span className="underline">
              about an hour and a half to two hours
            </span>
            , and we will contact the owner when it is finished.
          </p>
        </div>
        <GroomingReservation
          currentUser={currentUser}
          searchParams={searchParams}
        />
        <GroomingGallery />
      </div>
    </Container>
  );
};

export default GroomingPage;
