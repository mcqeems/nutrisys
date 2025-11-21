// components/sections/ComparisonTable.tsx
import { Check } from "lucide-react";

// Tipe data untuk baris tabel perbandingan
interface ComparisonRow {
  aspect: string;
  nutrisys: boolean;
  traditional: boolean;
}

const comparisonData: ComparisonRow[] = [
  { aspect: "Personalisasi", nutrisys: true, traditional: false },
  { aspect: "Tracking Real-time", nutrisys: true, traditional: false },
  { aspect: "AI Analysis", nutrisys: true, traditional: false },
  { aspect: "Akses 24/7", nutrisys: true, traditional: false },
  { aspect: "Biaya Terjangkau", nutrisys: true, traditional: false },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground animate-fade-in-up">
            NutriSys vs. Metode Tradisional
          </h2>
          <p
            className="text-lg text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Lihat perbedaan signifikan dalam hasil dan efisiensi
          </p>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full text-sm animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Aspek
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  NutriSys
                </th>
                <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                  Tradisional
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border hover:bg-primary/5 transition-colors duration-300 group"
                >
                  <td className="py-4 px-4 font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {row.aspect}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div
                      className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${
                        row.nutrisys ? "bg-primary/20" : "bg-destructive/20"
                      }`}
                    >
                      {row.nutrisys ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <span className="text-destructive font-bold">×</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div
                      className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${
                        row.traditional ? "bg-primary/20" : "bg-destructive/20"
                      }`}
                    >
                      {row.traditional ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <span className="text-destructive font-bold">×</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
