import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Termeni de utilizare — AquaPet',
  description: 'Termenii și condițiile de utilizare a magazinului online AquaPet.',
};

export default function TermeniPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-4">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Termeni de utilizare</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Termeni de utilizare</h1>
              <p className="text-stone-500 text-sm mt-0.5">Ultima actualizare: 31 mai 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 space-y-8 prose prose-stone max-w-none">

          <Section title="1. Acceptarea termenilor">
            <p>
              Prin accesarea și utilizarea site-ului <strong>AquaPet</strong> (aquapet.md), acceptați în totalitate
              prezentele Termeni de Utilizare. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să
              nu utilizați site-ul nostru.
            </p>
          </Section>

          <Section title="2. Descrierea serviciilor">
            <p>
              AquaPet este un magazin online specializat în produse pentru animale de companie, inclusiv hrană premium,
              jucării, accesorii și produse de îngrijire. Oferim servicii de livrare în toată Republica Moldova.
            </p>
          </Section>

          <Section title="3. Utilizarea site-ului">
            <p>Utilizatorul se angajează să:</p>
            <ul>
              <li>Furnizeze informații corecte și complete la plasarea comenzilor</li>
              <li>Nu utilizeze site-ul în scopuri ilegale sau frauduloase</li>
              <li>Nu interfereze cu funcționarea normală a site-ului</li>
              <li>Respecte drepturile de proprietate intelectuală ale AquaPet</li>
            </ul>
          </Section>

          <Section title="4. Prețuri și plăți">
            <p>
              Toate prețurile afișate sunt în lei moldovenești (MDL) și includ TVA acolo unde este aplicabil.
              AquaPet își rezervă dreptul de a modifica prețurile fără notificare prealabilă.
              Plata se poate efectua prin: card bancar, transfer bancar sau ramburs la livrare.
            </p>
          </Section>

          <Section title="5. Livrare">
            <p>
              Livrarea se efectuează în toată Republica Moldova în termen de 1–3 zile lucrătoare.
              Livrarea este gratuită pentru comenzile care depășesc 500 MDL. Pentru comenzile sub
              această valoare, taxa de livrare este de 45 MDL.
            </p>
          </Section>

          <Section title="6. Returnare și rambursare">
            <p>
              Aveți dreptul de a returna orice produs în termen de 30 de zile de la data primirii,
              cu condiția că produsul să fie în starea originală, nefolosit și în ambalajul original.
              Costul returului este suportat de cumpărător, cu excepția cazului în care produsul este defect.
            </p>
          </Section>

          <Section title="7. Răspunderea AquaPet">
            <p>
              AquaPet nu poate fi trasă la răspundere pentru daune indirecte, incidentale sau consecutive
              rezultate din utilizarea produselor noastre. Răspunderea noastră este limitată la valoarea
              comenzii efectuate.
            </p>
          </Section>

          <Section title="8. Modificarea termenilor">
            <p>
              AquaPet își rezervă dreptul de a modifica prezentele Termeni de Utilizare în orice moment.
              Modificările intră în vigoare imediat după publicarea pe site. Continuarea utilizării
              site-ului după modificări constituie acceptarea noilor termeni.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Pentru orice întrebări legate de acești termeni, ne puteți contacta la:
            </p>
            <ul>
              <li>Email: <a href="mailto:salut@aquapet.md" className="text-emerald-700 hover:underline">salut@aquapet.md</a></li>
              <li>Telefon: +373 22 123 456</li>
              <li>Adresă: Str. Ștefan cel Mare 123, Chișinău, Republica Moldova</li>
            </ul>
          </Section>

        </div>

        <div className="mt-6 text-center">
          <Link
            href="/confidentialitate"
            className="text-sm text-stone-500 hover:text-emerald-700 transition-colors underline underline-offset-2"
          >
            Vezi și Politica de confidențialitate →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100">
        {title}
      </h2>
      <div className="text-stone-600 leading-relaxed space-y-2 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-emerald-700 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  );
}
