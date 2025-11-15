import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import Logo from "@/public/logo.png";

export const Navbar = async () => {
  const user = await fetchLoggedUser();

  return (
    <div className="flex flex-row justify-between fixed h-20 w-full bg-transparent z-10 p-5">
      <img src={Logo.src} alt={""} height="100%" />
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
        {/* <nav>
          <Button as="li" variant="text">
            <Link
              link="/con
              tacts"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Contacts
            </Link>
          </Button>
        </nav> */}
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
        {/* <nav>
          <Button as="li" variant="text">
            <Link
              link="/login"
              className="text-2xl! text-black! hover:text-primary!"
              hideStyles
            >
              Login
            </Link>
          </Button>
        </nav> */}
        {user ? (
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
        ) : (
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
        )}
      </ul>
    </div>
  );
};
