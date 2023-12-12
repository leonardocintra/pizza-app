import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />

      <section className="text-center my-16">
        <SectionHeaders subHeader="Nossa historia" mainHeader="Sobre nós" />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            A Pizzaria do Gaúcho foi fundada em 1994, na cidade de Franca,
            interior de São Paulo. O sonho de um casal de gaúchos, apaixonados
            por pizza, tornou-se realidade.
          </p>
          <p>
            A princípio, a pizzaria era pequena e simples, mas a qualidade dos
            produtos e o atendimento diferenciado logo conquistaram o público.
            Com o tempo, a pizzaria foi crescendo e se consolidando como uma das
            melhores da cidade.
          </p>
          <p>
            Hoje, a Pizzaria do Gaúcho oferece um cardápio variado, com mais de
            50 sabores de pizzas, além de pratos executivos e massas. Os
            ingredientes são selecionados com cuidado e a massa é preparada
            artesanalmente, com ingredientes frescos e de qualidade.
          </p>
          <p>
            A Pizzaria do Gaúcho é um lugar para reunir os amigos e a família,
            para celebrar momentos especiais ou simplesmente para saborear uma
            pizza deliciosa.
          </p>
        </div>
      </section>

      <section>
        <SectionHeaders
          mainHeader="Ficou alguma duvida ?"
          subHeader="Contato"
        />
        <div className="my-5">
          <h3 className="text-center  text-4xl underline text-slate-700">(16) 99973-5008</h3>
        </div>
      </section>

      <footer className="border-t p-8 text-center text-gray-500">
        &copy; 2023 - Todos os direitos reservados
      </footer>
    </>
  );
}
