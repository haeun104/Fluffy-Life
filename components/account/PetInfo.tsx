"use client";

import { UserData } from "@/types";
import { Pet } from "@prisma/client";
import PetInputs from "../inputs/PetInputs";

interface PetInfoProps {
  currentUser: UserData | null;
  pets: Pet[] | undefined;
}

const PetInfo: React.FC<PetInfoProps> = ({ currentUser, pets }) => {
  if (!pets || pets.length === 0) {
    return (
      <div>
        <h3 className="font-bold text-lg text-accent-light-green">My Pet</h3>
        <div>
          <div>There is no pet registered</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-lg text-accent-light-green">My Pet</h3>
      <div>
        {(!pets || pets.length === 0) && <div>There is no pet registered</div>}
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
      <div></div>
    </div>
  );
};

export default PetInfo;
