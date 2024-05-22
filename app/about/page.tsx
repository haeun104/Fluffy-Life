import Container from "@/components/Container";
import Image from "next/image";
import room from "@/public/images/hotel-about.png";
import grooming from "@/public/images/grooming-about.png";
import playing from "@/public/images/playing-about.png";
import event from "@/public/images/event-about.png";

const AboutPage = () => {
  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col gap-4 mx-auto">
        <h2 className="text-main-teal text-lg font-bold">About Us</h2>
        <p>
          Founded in 2020, Fluffy Life has quickly become a trusted name in pet
          care. Our love for animals drives everything we do, and we are
          committed to creating a home away from home for your beloved pet.
          Whether you need a safe place for your dog to stay while you’re on
          vacation or a professional grooming service to keep them looking their
          best, you can count on us.
        </p>
        <h3 className="font-bold text-accent-light-green text-lg">
          Our Services
        </h3>
        <div className="flex flex-col max-w-[350px] sm:flex-row sm:max-w-full  gap-2">
          <div className="animate-fade-in-1 p-2 bg-white rounded-lg shadow-lg">
            <Image src={room} alt="room" />
          </div>
          <div className="animate-fade-in-2 p-2 bg-white rounded-lg shadow-lg">
            <Image src={grooming} alt="grooming" />
          </div>
          <div className="animate-fade-in-3 p-2 bg-white rounded-lg shadow-lg">
            <Image src={playing} alt="playing" />
          </div>
          <div className="animate-fade-in-4 p-2 bg-white rounded-lg shadow-lg">
            <Image src={event} alt="event" />
          </div>
        </div>
        <h4 className="font-bold text-main-gray">Luxury Dog Hotel</h4>
        <p>
          Our state-of-the-art dog hotel offers a safe, comfortable, and fun
          environment for your pet while you are away. Each guest enjoys a
          private suite, cozy bedding, and daily playtime in our spacious play
          areas. We cater to the unique needs of each dog, providing
          personalized attention and care to ensure they have a relaxing and
          enjoyable stay.
        </p>
        <h4 className="font-bold text-main-gray">Professional Grooming</h4>
        <p>
          Our professional grooming services are designed to keep your dog
          looking and feeling their best. From a simple bath to a full grooming
          session, our experienced groomers use high-quality products and gentle
          techniques to pamper your pet. We offer a variety of grooming packages
          to suit the needs of dogs of all breeds and sizes.
        </p>
        <h4 className="font-bold text-main-gray">Fun and Engaging Events</h4>
        <p>
          At Fluffy Life, we love to keep our furry guests entertained and
          happy. That&apos;s why we host a variety of events throughout the
          year, including:
        </p>
        <ul className="flex flex-col gap-2">
          <li>
            <span className="font-bold text-[#B4B4B8]">Puppy Playdates - </span>
            Socialize your puppy with others in a safe and supervised
            environment
          </li>
          <li>
            <span className="font-bold text-[#B4B4B8]">Themed Parties - </span>
            Celebrate holidays and special occasions with themed parties for the
            dogs.
          </li>
          <li>
            <span className="font-bold text-[#B4B4B8]">
              Training Workshops -{" "}
            </span>
            Participate in training sessions to improve your dog&apos;s
            obedience and manners.
          </li>
        </ul>
        <p>
          These events are designed to stimulate your dog&apos;s mind, keep them
          active, and provide opportunities for socialization and fun.
        </p>
        <h3 className="font-bold text-accent-light-green text-lg">Visit Us</h3>
        <p>
          We invite you to visit our facility and see firsthand the quality care
          we provide. Feel free to contact us to schedule a tour or to learn
          more about our services. We look forward to meeting you and your furry
          friend!
        </p>
        <h4 className="font-bold text-main-gray">Contact Information</h4>
        <ul>
          <li>Address: Radosna 22, 12-345 Poznan, Poland </li>
          <li>Email: fluffylife@service.com</li>
          <li>Phone: 123-456-789</li>
        </ul>
      </div>
    </Container>
  );
};

export default AboutPage;
