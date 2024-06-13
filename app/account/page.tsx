import getCurrentUser from "@/actions/getCurrentUser";
import getPets from "@/actions/getPets";
import Container from "@/components/Container";
import PersonalInfo from "@/components/account/PersonalInfo";
import PetInfo from "@/components/account/PetInfo";
import PetRegisterModal from "@/components/modals/PetRegisterModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fluffy Life - My Account",
  description: "Easily update your account details",
};

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  } else {
    const pets = await getPets(currentUser.id);

    return (
      <Container>
        <div className="max-w-[600px] mx-auto py-10">
          <h2 className="font-bold text-xl text-main-teal">My Account</h2>
          <div className="flex flex-col gap-10">
            <PersonalInfo currentUser={currentUser} />
            <PetInfo pets={pets} />
          </div>
        </div>
        <PetRegisterModal currentUser={currentUser} />
      </Container>
    );
  }
};

export default AccountPage;
