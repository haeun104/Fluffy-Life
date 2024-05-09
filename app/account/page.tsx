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
        <h2 className="font-bold text-xl text-main-teal mt-10">My Account</h2>
        <div className="flex flex-col gap-10">
          <PersonalInfo currentUser={currentUser} />
          <PetInfo currentUser={currentUser} pets={pets} />
        </div>
        <PetRegisterModal currentUser={currentUser}/>
      </Container>
    );
  }
};

export default AccountPage;
