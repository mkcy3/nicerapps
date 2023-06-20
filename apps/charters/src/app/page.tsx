import Link from 'next/link'

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
    href: '#',
    description:
      'Enjoy a day on beausail.... Outline Day Sail and maybe Weekend activites.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
  },
  {
    id: 2,
    title: 'Week Long Adventurers',
    href: '#',
    description: 'Explore a little farther',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
  },
  {
    id: 3,
    title: 'Aspiring Cruisers',
    href: '#',
    description:
      'A special package for mileage building and people looking to go cruising in retirement. This trip is packed with information about vessel operation, maintenance and offshore sailing concerns.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
  },
  // More posts...
]

// function Photos() {
//   let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

//   return (
//     <div className="mt-16 sm:mt-20">
//       <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
//         {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
//           <div
//             key={image.src}
//             className={clsx(
//               'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
//               rotations[imageIndex % rotations.length]
//             )}
//           >
//             <Image
//               src={image}
//               alt=""
//               sizes="(min-width: 640px) 18rem, 11rem"
//               className="absolute inset-0 h-full w-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <main>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-5/6 w-full object-cover"
        />

        <section
          id="hero"
          className="h-[calc(83.333333vh-72px)] py-24 sm:py-32"
        >
          <Container>
            <div className="flex h-full flex-col items-start justify-center space-y-6">
              <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl">
                Go sailing on Georgian Bay
              </h1>
              <p className="max-w-2xl text-lg tracking-tight text-slate-200">
                Blah blah
              </p>

              <Link href="/trip" className={cn(buttonVariantStyles.primary)}>
                Check Dates
              </Link>

              <div className="flex justify-between"></div>
            </div>
          </Container>
        </section>
        <section id="destinations" className=" py-24 sm:py-32">
          <Container>
            <div className="px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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
                      <img
                        src={post.imageUrl}
                        alt=""
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
                  <img
                    className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                    src="https://images.unsplash.com/photo-1630569267625-157f8f9d1a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
                  <div
                    className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                    aria-hidden="true"
                  >
                    <div
                      className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                      style={{
                        clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                    />
                  </div>
                  <figure className="relative isolate">
                    <svg
                      viewBox="0 0 162 128"
                      fill="none"
                      aria-hidden="true"
                      className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                    >
                      <path
                        id="0ef284b8-28c2-426e-9442-8655d393522e"
                        d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                      />
                      <use
                        href="#0ef284b8-28c2-426e-9442-8655d393522e"
                        x={86}
                      />
                    </svg>

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
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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
