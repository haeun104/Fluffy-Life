import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import PersonalInfo from "@/components/account/PersonalInfo";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <Container>
      <div className="mt-10">
        <h2 className="font-bold text-xl text-main-teal">My Account</h2>
        <PersonalInfo currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default AccountPage;
