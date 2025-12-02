"use client";

export default function ContactHeader() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b pt-20">
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="translate-y-8 transition-all duration-700">
            <h1 className="text-4xl sm:text-5xl text-center lg:text-6xl font-bold text-foreground leading-tight text-balance mt-4">
              Mari Terhubung
            </h1>
          </div>

          <div className="translate-y-8 transition-all duration-700">
            <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
              Kami ingin mendengar dari Anda. Hubungi kami dengan pertanyaan,
              masukan, atau sekadar untuk mengucapkan salam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
