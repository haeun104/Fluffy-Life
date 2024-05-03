import suiteImage from "../public/images/room-suite.jpg";
import standardImage from "../public/images/room-standard.jpg";

export const rooms = [
  {
    roomId: "suite",
    roomType: "Suite",
    roomPrice: 150,
    groomingInclude: false,
    title: "Suite room including pool and play yard",
    image: suiteImage,
    description: "Description to be updated",
  },
  {
    roomId: "standard",
    roomType: "Standard",
    roomPrice: 100,
    groomingInclude: false,
    title: "Standard room including play yard",
    image: standardImage,
    description: "Description to be updated",
  },
  {
    roomId: "suite-package",
    roomType: "Suite Package",
    roomPrice: 150,
    groomingInclude: true,
    groomingPrice: 150,
    title: "Suite room including onetime grooming service",
    image: suiteImage,
    description: "Description to be updated",
  },
  {
    roomId: "standard-package",
    roomType: "Standard Package",
    roomPrice: 100,
    groomingInclude: true,
    groomingPrice: 180,
    title: "Suite room including onetime grooming service",
    image: standardImage,
    description: "Description to be updated",
  },
];
