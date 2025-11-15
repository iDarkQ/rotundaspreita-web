import { Button } from "@/app/_components/button";
import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  return (
    <Section>
      <Text as="h1">Login</Text>
      <Text as="p">
        Create / Login into your Bom Condutor account by clicking the button
        below
      </Text>
      <Button className="gap-2 flex flex-row items-center justify-center">
        <Text as="h4" className="text-white">
          Authenticate with Google{" "}
        </Text>
        <FaGoogle className="text-white" size={20} />
      </Button>
    </Section>
  );
}
