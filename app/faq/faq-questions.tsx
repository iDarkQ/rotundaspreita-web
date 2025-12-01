import { Disclosure } from "@/app/_components/disclosure/disclosure";
import { DisclosureButton } from "@/app/_components/disclosure/disclosure-button";
import { DisclosurePanel } from "@/app/_components/disclosure/disclosure-panel";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/utils/route-names";

export const FAQQuestions = () => (
  <div className="2xl:w-[50%] max-2xl:w-[80%] max-xl:w-full flex flex-col gap-4 mt-6">
    {/* O que é a ROTUNDASPREITA? */}
    <Disclosure defaultOpen={true}>
      <DisclosureButton>O que é a ROTUNDASPREITA?</DisclosureButton>
      <DisclosurePanel>
        A ROTUNDASPREITA é uma plataforma de estudo que ajuda candidatos a
        prepararem-se para o exame{" "}
        <strong>para instrutor(a) ou diretor(a) de escola de condução</strong>.
        A plataforma fornece testes curtos de prática (30 questões,
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
        começará a mostrar questões já vistas, permitindo continuar a praticar.
      </DisclosurePanel>
    </Disclosure>

    {/* Como são classificadas as questões difíceis? */}
    <Disclosure>
      <DisclosureButton>
        Como são classificadas as questões difíceis?
      </DisclosureButton>
      <DisclosurePanel>
        Analisamos dados anonimizados de utilização (como taxas de erro e número
        de tentativas) para identificar as questões com que os utilizadores têm
        mais dificuldades. Essas questões são então marcadas como{" "}
        <strong>díficas</strong>.
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
          <strong>NOVOS</strong> - 30 questões que ainda não viu. Se já tiver
          visto todas, serão mostradas questões repetidas.
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
        <Text>
          Para cancelar a sua subscrição, certifique-se de que está{" "}
          <strong>autenticado</strong> na plataforma. Em seguida, aceda ao seu{" "}
          <strong>
            <Link link={RouteNames.PANEL} className="text-primary!">
              Perfil
            </Link>
          </strong>{" "}
          e clique no ícone de <strong>Definições</strong> (engrenagem) no canto
          superior direito do ecrã. Na janela que surge, selecione{" "}
          <strong>Cancelar subscrição</strong>.
        </Text>
      </DisclosurePanel>
    </Disclosure>

    <Disclosure>
      <DisclosureButton>
        O que acontece se eu cancelar a subscrição?
      </DisclosureButton>
      <DisclosurePanel>
        <Text>
          Após o cancelamento, continuará a ter acesso ao serviço até ao fim do
          período já pago. Depois disso, não será cobrado novamente, a menos que
          escolha <strong>renovar</strong> a subscrição.
        </Text>
      </DisclosurePanel>
    </Disclosure>

    {/* Reembolsos */}
    <Disclosure>
      <DisclosureButton>Posso pedir reembolso?</DisclosureButton>
      <DisclosurePanel>
        Subscrições <strong>não são reembolsáveis</strong>, exceto quando
        exigido por lei. Caso tenha um motivo excecional, contacte o suporte com
        os detalhes da subscrição.
      </DisclosurePanel>
    </Disclosure>
  </div>
);
