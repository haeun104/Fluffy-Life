"use client";

import { Pet } from "@prisma/client";
import PetInputs from "../inputs/PetInputs";
import { IoMdAddCircle } from "react-icons/io";
import usePetRegisterModal from "@/hooks/usePetRegisterModal";

interface PetInfoProps {
  pets: Pet[] | undefined;
}

const PetInfo: React.FC<PetInfoProps> = ({ pets }) => {
  const petRegisterModal = usePetRegisterModal();
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-bold text-lg text-accent-light-green">My Pet</h3>
        <div
          className="flex items-center cursor-pointer text-main-teal"
          onClick={petRegisterModal.onOpen}
        >
          <IoMdAddCircle size={20}/>
          Add a pet
        </div>
      </div>
      <div>
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetInfo;
