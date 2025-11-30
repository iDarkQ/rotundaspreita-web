import { Disclosure } from "@/app/_components/disclosure/disclosure";
import { DisclosureButton } from "@/app/_components/disclosure/disclosure-button";
import { DisclosurePanel } from "@/app/_components/disclosure/disclosure-panel";
import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";

export default async function FAQ() {
  return (
    <Section>
      <Text as="h1" center>Perguntas Frequentes</Text>

      <div className="2xl:w-[50%] max-2xl:w-[80%] max-xl:w-full flex flex-col gap-4 mt-6">
        {/* O que é a ROTUNDASPREITA? */}
        <Disclosure defaultOpen={true}>
          <DisclosureButton>O que é a ROTUNDASPREITA?</DisclosureButton>
          <DisclosurePanel>
            A ROTUNDASPREITA é uma plataforma de estudo que ajuda candidatos a
            prepararem-se para o exame{" "}
            <strong>
              para instrutor(a) ou diretor(a) de escola de condução
            </strong>
            . A plataforma fornece testes curtos de prática (30 questões,
            aproximadamente 30 minutos) para estudo em sessões focadas.
          </DisclosurePanel>
        </Disclosure>

        {/* Quantas questões existem? */}
        <Disclosure>
          <DisclosureButton>Quantas questões existem?</DisclosureButton>
          <DisclosurePanel>
            Existem <strong>mais de 600</strong> questões no banco atual. Novas
            questões são adicionadas periodicamente.
          </DisclosurePanel>
        </Disclosure>

        {/* O que acontece se eu vir todas as questões? */}
        <Disclosure>
          <DisclosureButton>
            O que acontece se eu vir todas as questões?
          </DisclosureButton>
          <DisclosurePanel>
            Pode continuar a usar o serviço normalmente. Se selecionar o modo{" "}
            <strong>NOVAS</strong> e já tiver visto todas as questões, o sistema
            começará a mostrar questões já vistas, permitindo continuar a
            praticar.
          </DisclosurePanel>
        </Disclosure>

        {/* Como são classificadas as questões difíceis? */}
        <Disclosure>
          <DisclosureButton>
            Como são classificadas as questões difíceis?
          </DisclosureButton>
          <DisclosurePanel>
            Analisamos dados anonimizados de utilização (como taxas de erro e
            número de tentativas) para identificar as questões com que os
            utilizadores têm mais dificuldades. Essas questões são então
            marcadas como <strong>díficas</strong>.
          </DisclosurePanel>
        </Disclosure>

        {/* Modos de Teste */}
        <Disclosure>
          <DisclosureButton>
            O que fazem os diferentes modos de teste?
          </DisclosureButton>
          <DisclosurePanel>
            <p>
              <strong>TODOS</strong> - 30 questões aleatórias de todo o banco,
              independentemente de já as ter visto.
            </p>
            <p>
              <strong>NOVOS</strong> - 30 questões que ainda não viu. Se já
              tiver visto todas, serão mostradas questões repetidas.
            </p>
            <p>
              <strong>DIFÍCEIS</strong> - 30 questões marcadas como difíceis com
              base no desempenho geral dos utilizadores.
            </p>
          </DisclosurePanel>
        </Disclosure>

        {/* Cancelar Subscrição */}
        <Disclosure>
          <DisclosureButton>Como cancelo a subscrição?</DisclosureButton>
          <DisclosurePanel>
            <p>
              Se subscreveu no site: aceda ao seu <strong>Perfil</strong> →{" "}
              <strong>Definições</strong> (ícone de engrenagem) →{" "}
              <strong>Cancelar subscrição</strong>.
            </p>
            <p>
              Se subscreveu pela <strong>App Store</strong> (iOS) ou{" "}
              <strong>Google Play</strong> (Android), deve cancelar a subscrição
              diretamente através da sua conta Apple ou Google.
            </p>
          </DisclosurePanel>
        </Disclosure>

        {/* Reembolsos */}
        <Disclosure>
          <DisclosureButton>Posso pedir reembolso?</DisclosureButton>
          <DisclosurePanel>
            Subscrições <strong>não são reembolsáveis</strong>, exceto quando
            exigido por lei. Caso tenha um motivo excecional, contacte o suporte
            com os detalhes da subscrição.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </Section>
  );
}
