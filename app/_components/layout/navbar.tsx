import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";

export const Navbar = () => {
  return (
    <div className="flex flex-row justify-between fixed h-20 w-full bg-transparent z-10 p-5">
      <Text as="p" className="text-3xl! font-bold">
        Bom Diretor
      </Text>
      <ul className="flex flex-row gap-2">
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Home
            </Link>
          </Button>
        </nav>
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/contacts"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Contacts
            </Link>
          </Button>
        </nav>
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/faq"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              FAQ
            </Link>
          </Button>
        </nav>
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/questions"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Questions
            </Link>
          </Button>
        </nav>
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/login"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Login
            </Link>
          </Button>
        </nav>
        <nav>
          <Button as="li" variant="text">
            <Link
              link="/panel"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Panel
            </Link>
          </Button>
        </nav>
      </ul>
    </div>
  );
};
