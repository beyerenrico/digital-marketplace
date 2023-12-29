import Link from 'next/link';
import { getDictionary } from '@/app/[lang]/dictionaries';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: {
    lang: string
  }
}

const Home: React.FC<PageProps> = async ({ params: { lang } }) => {
  const { pages: { home: { hero, perks } } } = await getDictionary(lang);

  return (
    <>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl hyphens-auto'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            {hero.headline.text} <span className='text-primary'>{hero.headline.highlightedText}</span>.
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            {hero.subline}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Button asChild>
              <Link
                href={hero.button.primary.link}
              >{hero.button.primary.text}</Link>
            </Button>
            <Button variant='ghost'>
              {hero.button.secondary}
            </Button>
          </div>
        </div>

        {/* TODO: List products */}
      </MaxWidthWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map(({ name, Icon, description }) => (
              <div key={name} className='text-center md:flex md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <Icon className='w-1/3 h-1/3' />
                  </div>
                </div>
                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='font-medium text-gray-900'>{name}</h3>
                  <p className='mt-3 text-sm text-muted-foreground'>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Home;
