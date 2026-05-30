import Link from 'next/link';
import { ChevronRight, Shield } from 'lucide-react';

export const metadata = {
  title: 'Politica de confidențialitate — AquaPet',
  description: 'Politica de confidențialitate și protecția datelor personale la AquaPet.',
};

export default function ConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-4">
            <Link href="/" className="hover:text-stone-900 transition-colors">Acasă</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-medium">Politica de confidențialitate</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Politica de confidențialitate</h1>
              <p className="text-stone-500 text-sm mt-0.5">Ultima actualizare: 31 mai 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 space-y-8">

          <Section title="1. Introducere">
            <p>
              AquaPet respectă confidențialitatea datelor dumneavoastră personale. Această politică explică
              ce date colectăm, cum le utilizăm și cum le protejăm, în conformitate cu Regulamentul General
              privind Protecția Datelor (GDPR) și legislația din Republica Moldova.
            </p>
          </Section>

          <Section title="2. Date colectate">
            <p>Colectăm următoarele tipuri de date personale:</p>
            <ul>
              <li><strong>Date de contact:</strong> Nume, prenume, adresă de email, număr de telefon</li>
              <li><strong>Date de livrare:</strong> Adresa poștală, orașul, instrucțiuni speciale</li>
              <li><strong>Date de plată:</strong> Informații despre card (procesate securizat de procesatorul de plăți)</li>
              <li><strong>Date de navigare:</strong> Adresa IP, tipul de browser, paginile vizitate (prin cookie-uri)</li>
            </ul>
          </Section>

          <Section title="3. Scopul colectării datelor">
            <p>Datele personale sunt colectate pentru:</p>
            <ul>
              <li>Procesarea și livrarea comenzilor</li>
              <li>Comunicarea cu clienții privind comenzile</li>
              <li>Îmbunătățirea serviciilor și experienței pe site</li>
              <li>Trimiterea de informații despre produse și oferte (doar cu consimțământul dvs.)</li>
              <li>Respectarea obligațiilor legale</li>
            </ul>
          </Section>

          <Section title="4. Stocarea datelor">
            <p>
              Datele personale sunt stocate pe servere securizate. Păstrăm datele dvs. atâta timp cât
              este necesar pentru scopurile indicate sau cât prevede legislația în vigoare.
              Datele de comandă sunt păstrate timp de 5 ani conform cerințelor legale fiscale.
            </p>
          </Section>

          <Section title="5. Partajarea datelor">
            <p>
              Nu vindem, nu închiriem și nu partajăm datele dvs. personale cu terți, cu excepția:
            </p>
            <ul>
              <li>Furnizorilor de servicii de livrare (curierat), strict pentru livrarea comenzilor</li>
              <li>Procesatorilor de plăți, pentru finalizarea tranzacțiilor</li>
              <li>Autorităților competente, când suntem obligați legal</li>
            </ul>
          </Section>

          <Section title="6. Cookie-uri">
            <p>
              Site-ul nostru utilizează cookie-uri pentru a asigura funcționarea corespunzătoare (coș de
              cumpărături, sesiune de autentificare) și pentru analiza traficului. Puteți dezactiva
              cookie-urile din setările browserului, dar unele funcționalități pot fi afectate.
            </p>
          </Section>

          <Section title="7. Drepturile dumneavoastră">
            <p>Aveți dreptul să:</p>
            <ul>
              <li><strong>Accesați</strong> datele personale pe care le deținem despre dvs.</li>
              <li><strong>Rectificați</strong> datele incorecte sau incomplete</li>
              <li><strong>Ștergeți</strong> datele personale ("dreptul de a fi uitat")</li>
              <li><strong>Limitați</strong> prelucrarea datelor dvs.</li>
              <li><strong>Portabilizați</strong> datele dvs. în format lizibil</li>
              <li><strong>Vă opuneți</strong> prelucrării datelor în scop de marketing</li>
            </ul>
          </Section>

          <Section title="8. Securitatea datelor">
            <p>
              Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dvs. personale
              împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii. Transmiterea datelor
              de plată se realizează prin conexiuni criptate SSL/TLS.
            </p>
          </Section>

          <Section title="9. Contact DPO">
            <p>
              Pentru exercitarea drepturilor dvs. sau pentru orice întrebare legată de prelucrarea datelor,
              ne puteți contacta la:
            </p>
            <ul>
              <li>Email: <a href="mailto:salut@aquapet.md">salut@aquapet.md</a></li>
              <li>Telefon: +373 22 123 456</li>
              <li>Adresă: Str. Ștefan cel Mare 123, Chișinău, Republica Moldova</li>
            </ul>
          </Section>

        </div>

        <div className="mt-6 text-center">
          <Link
            href="/termeni"
            className="text-sm text-stone-500 hover:text-emerald-700 transition-colors underline underline-offset-2"
          >
            ← Vezi și Termenii de utilizare
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
      <div className="text-stone-600 leading-relaxed space-y-2 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-stone-900 [&_a]:text-emerald-700 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  );
}
