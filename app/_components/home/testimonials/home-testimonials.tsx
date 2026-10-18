import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";
import { TestimonialCard } from "@/app/_components/home/testimonials/testimonial-card";

const testimonials = [
  {
    name: "Ricardo V.",
    registeredSince: "Membro desde dez. 2025",
    message:
      "Muito boa iniciativa A APP que faltava no mercado, mas é preciso que seja 100% respostas corretas para que seja uma grande ferramenta de estudo e preparação para o exame destas profissōes e quiçá no futuro outras. Parabéns",
  },
  {
    name: "Diogo P.",
    registeredSince: "Membro desde abr. 2025",
    message:
      "É um bom site, com muito potencial, onde se pode encontrar perguntas pertinentes e bem estruturadas.",
  },
  {
    name: "Carla R.",
    registeredSince: "Membro desde mar. 2025",
    message:
      "Comecei hoje a utilizar e para já estou satisfeita. Obrigada pelo vosso trabalho!",
  },

];

const testimonialCopies = [0, 1] as const;

export const HomeTestimonials = () => (
  <Section className="gap-6 py-12">
    <div className="flex w-full flex-col gap-2">
      <Text as="h2" className="text-center">
        O que dizem sobre nós
      </Text>
      <Text className="text-center">
        Conteúdo de demonstração — nomes e mensagens ilustrativos, sem relação
        com avaliações reais.
      </Text>
    </div>

    <div
      className="testimonials-viewport w-full"
      tabIndex={0}
      aria-label="Carrossel de testemunhos ilustrativos"
    >
      <div className="testimonials-track">
        {testimonialCopies.map((copy) => (
          <div
            key={copy}
            className="testimonials-group"
            aria-hidden={copy === 1}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`${copy}-${testimonial.name}`}
                {...testimonial}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </Section>
);
