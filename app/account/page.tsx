import getCurrentUser from "@/actions/getCurrentUser";
import getPets from "@/actions/getPets";
import Container from "@/components/Container";
import PersonalInfo from "@/components/account/PersonalInfo";
import PetInfo from "@/components/account/PetInfo";
import PetRegisterModal from "@/components/modals/PetRegisterModal";

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
          <PetInfo currentUser={currentUser} pets={pets} />
        </div>
        </div>
        <PetRegisterModal currentUser={currentUser}/>
      </Container>
    );
  }
};

export default AccountPage;
