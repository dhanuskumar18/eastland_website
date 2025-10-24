import Image from "next/image"

export default function OurPortfolioPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/images/Services/Rectangle 52 (5).png"
            alt="Our Portfolio"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Our Portfolio
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Showcasing Our Best Work
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our Gallery
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Showcasing Exceptional Designs <span className="text-emerald-700">Through Visual Project Highlights</span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Row 1 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand.png "
                alt="Project 1"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (1).png "
                alt="Project 2"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (2).png "
                alt="Project 3"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (3).png "
                alt="Project 4"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (4).png "
                alt="Project 5"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (5).png "
                alt="Project 6"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (6).png "
                alt="Project 7"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (7).png "
                alt="Project 8"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (8).png "
                alt="Project 9"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (9).png "
                alt="Project 10"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (10).png "
                alt="Project 11"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (11).png "
                alt="Project 12"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (12).png "
                alt="Project 13"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand (13).png "
                alt="Project 14"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>

            <div className="group relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="/images/Services/spacious-hall-luxury-restaurant-with-fashionable-modern-designer-furniture-huge-beams 1.png "
                alt="Project 15"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/60 via-black/40 to-black/0 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/0 transition-all duration-300 flex items-center justify-center transform translate-y-full group-hover:translate-y-0">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
