import Image from 'next/image'
import Link from 'next/link'

import mk from '@/assets/milan.webp'
import mobileHeroImage from '@/assets/mobile-hero.webp'
import firstImage from '@/assets/post1.webp'
import secondImage from '@/assets/post2.webp'
import thirdImage from '@/assets/post3.webp'
import Carousel from '@/components/carousel'
import Banner from '@/components/layout/banner'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import { buttonVariantStyles } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { cn } from '@/lib/utils'

const posts = [
  {
    id: 1,
    title: 'Day and Weekend Sailors',
    href: '/trip',
    description:
      'Enjoy a day on beausail.... Outline Day Sail and maybe Weekend activites.',
    imageUrl: firstImage.src,
  },
  {
    id: 2,
    title: 'Week Long Adventurers',
    href: '/trip',
    description: 'Explore a little farther',
    imageUrl: thirdImage.src,
  },
  {
    id: 3,
    title: 'Aspiring Cruisers',
    href: '/trip',
    description:
      'A special package for mileage building and people looking to go cruising in retirement. This trip is packed with information about vessel operation, maintenance and offshore sailing concerns.',
    imageUrl: secondImage.src,
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <main>
        <section id="hero" className="relative h-[calc(83.333333vh-72px)]">
          <Carousel className="hidden md:block" />

          <div className="relative flex h-full w-full flex-col items-start justify-center md:hidden">
            <Container>
              <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
                Sailing on Georgian Bay
              </h1>
              <p className="max-w-2xl text-lg tracking-tight text-slate-200">
                Party it up or chill on Gbay
              </p>

              <Link href="/trip" className={cn(buttonVariantStyles.primary)}>
                Check Dates
              </Link>
            </Container>
            <Image
              src={mobileHeroImage.src}
              alt="beautiful georgian bay"
              width={500}
              height={600}
              priority
              className="absolute -z-10 h-full w-full object-fill"
            />
          </div>
        </section>
        <section id="destinations" className=" py-24 sm:py-32">
          <Container>
            <div className="px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-charcoal text-3xl font-bold tracking-tight sm:text-4xl">
                  Experiences for everyone
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Every charter is whatever you want to make of it!
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <div key={post.id}>
                    <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                      <Image
                        src={post.imageUrl}
                        height={636}
                        width={584}
                        alt={post.title}
                        className="absolute inset-0 -z-10 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                        <span className="absolute inset-0" />
                        {post.title}
                      </h3>
                    </div>
                    <p className="prose mt-8 px-2">{post.description}</p>
                  </div>
                ))}
              </div>
              <p className="prose mt-16 px-2">
                No matter the length of your trip, you can be as involved in the
                operation of the vessel as much or as little as you wish.
              </p>
            </div>
          </Container>
        </section>
        <section id="skipper" className="bg-gray-50 py-24 sm:py-32">
          <Container>
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-4">
                <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:mx-auto lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={mk}
                    alt="Skipper Milan"
                    height={800}
                    width={800}
                  />

                  <figure className="relative isolate">
                    <figcaption className="mt-6 text-sm leading-6 text-gray-300">
                      <strong className="font-semibold text-white">
                        From Toronto to Georgian Bay,
                      </strong>{' '}
                      2021
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div>
                <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                  <p className="text-base font-semibold leading-7 text-indigo-600">
                    Skipper
                  </p>
                  <h1 className="text-charcoal mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Meet Milan Kor<span className="text-indigo-600">nicer</span>
                  </h1>
                  <div className="max-w-xl">
                    {/* 
                    Write a biography of a charter captain named Milan. This
                    will be featured on a website and have to contain exactly
                    1 heading, and 3 paragraphs. This also has to be written
                    as promotional website copy to encourage charterers to
                    book and sail with Milan. Milan has to appear
                    professional when it comes to talking about safety. Fun
                    and likeable when talking about enjoying the water and
                    adventorous when talking about exploring. 
                    
                    The first paragraph will talk about his youth that included sailing with his
                    father and racing sailboats.
                    
                    The second paragraph talks about his love of hosting friends and family on
                    charter trips around the world.
                    

                    The third paragraph needs to include him getting his commercial Yachtmaster
Offshore license and him wanting to share these amazing experiences with
others. 
                    
*/}
                    <p className="mt-6">
                      Embark on an extraordinary journey with Captain Milan, an
                      experienced and passionate charter captain who has
                      dedicated his life to the seas. Milan&apos;s love for
                      sailing was instilled at a young age when he spent
                      countless hours navigating the open waters alongside his
                      father. From racing sailboats to exploring hidden coves,
                      his youth was a tapestry of thrilling maritime adventures
                      that fueled his lifelong passion for the sea.
                    </p>
                    <p className="mt-8">
                      Milan&apos;s genuine love for hosting friends and family
                      on unforgettable charter trips around the world shines
                      through in every voyage he embarks upon. With an
                      unwavering commitment to providing exceptional service, he
                      ensures that every moment on board is filled with joy,
                      laughter, and unforgettable memories. Whether it&apos;s a
                      relaxing cruise through turquoise waters or an
                      adrenaline-pumping snorkeling excursion, Captain Milan
                      effortlessly creates an atmosphere that blends relaxation
                      and excitement, making him the perfect companion for your
                      nautical escapades.
                    </p>
                    <p className="mt-8">
                      Driven by his insatiable wanderlust and commitment to
                      professionalism, Captain Milan pursued and achieved his
                      commercial Yachtmaster Offshore license. This milestone in
                      his career not only solidified his expertise in navigating
                      diverse waters but also ignited a burning desire to share
                      his amazing experiences with others. Safety is always
                      Milan&apos;s utmost priority, and he ensures that every
                      voyage is meticulously planned and executed with the
                      highest standards. You can trust Captain Milan to guide
                      you through your charter adventure with unparalleled
                      skill, making your safety his topmost concern, while still
                      providing an exhilarating and unforgettable experience
                      that will leave you longing for more.
                    </p>
                    <p className="mt-8">
                      Experience the magic of the open seas with Captain Milan,
                      where safety, enjoyment, and adventure come together
                      seamlessly. Book your charter trip today and allow Milan
                      to guide you on an extraordinary voyage that will create
                      memories to last a lifetime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
