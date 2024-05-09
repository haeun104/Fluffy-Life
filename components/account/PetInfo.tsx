"use client";

import { UserData } from "@/types";
import { Pet } from "@prisma/client";
import PetInputs from "../inputs/PetInputs";
import { IoMdAddCircle } from "react-icons/io";
import usePetRegisterModal from "@/hooks/usePetRegisterModal";

interface PetInfoProps {
  currentUser: UserData | null;
  pets: Pet[] | undefined;
}

const PetInfo: React.FC<PetInfoProps> = ({ currentUser, pets }) => {
  const petRegisterModal = usePetRegisterModal();
  return (
    <div>
      <div className="flex justify-between max-w-[600px]">
        <h3 className="font-bold text-lg text-accent-light-green">My Pet</h3>
        <div
          className="flex items-center cursor-pointer"
          onClick={petRegisterModal.onOpen}
        >
          <IoMdAddCircle />
          Add a pet
        </div>
      </div>
      <div className="max-w-[600px]">
        {!pets || pets.length === 0 ? (
          <div className="text-center my-6">There is no pet registered</div>
        ) : (
          <div>
            {" "}
            {pets.map((pet, index) => (
              <PetInputs
                key={index}
                number={index}
                id={pet.id}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                chipNumber={pet.chipNumber}
                remark={pet.remark}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetInfo;
