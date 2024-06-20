import Image from 'next/image';

import { Button } from '@bigcommerce/components/button';
import {
  Slideshow,
  SlideshowAutoplayControl,
  SlideshowContent,
  SlideshowControls,
  SlideshowNextIndicator,
  SlideshowPagination,
  SlideshowPreviousIndicator,
  SlideshowSlide,
} from '@bigcommerce/components/slideshow';

import SlideshowBG1 from './slideshow-bg-01.jpg';
import SlideshowBG2 from './slideshow-bg-02.jpg';
import SlideshowBG3 from './slideshow-bg-03.jpg';
import SlideshowBG4 from './slideshow-bg-04.jpg';

export const Hero = () => (
  <Slideshow>
    <SlideshowContent>
      <SlideshowSlide>
        <div className="relative">
          <Image
            alt="an assortment of brandless products against a blank background"
            className="absolute -z-10 object-cover"
            fill
            priority
            sizes="(max-width: 1536px) 100vw, 1536px"
            src={SlideshowBG2}
          />
          <div className="flex flex-col gap-4 pb-48 pt-36 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto">
            <h2 className="text-5xl font-black lg:text-6xl">25% Off Sale</h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Button asChild className="w-fit">
              <a href="/#">Shop now</a>
            </Button>
          </div>
        </div>
      </SlideshowSlide>
      <SlideshowSlide>
        <div className={'relative'}>
          <Image
              alt="an assortment of brandless products against a blank background"
              className="absolute -z-10 object-cover"
              fill
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
              src={SlideshowBG3}
          />
          <div className="flex flex-col gap-4 pb-48 pt-36 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto">
            <h2 className="text-5xl font-black lg:text-6xl">Great Deals</h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Button asChild className="w-fit">
              <a href="/#">Shop now</a>
            </Button>
          </div>
        </div>
      </SlideshowSlide>
      <SlideshowSlide>
      <div className={'relative'}>
          <Image
              alt="an assortment of brandless products against a blank background"
              className="absolute -z-10 object-cover"
              fill
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
              src={SlideshowBG4}
          />
          <div className="flex flex-col gap-4 pb-48 pt-36 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto">
            <h2 className="text-5xl font-black lg:text-6xl">Low Prices</h2>
            <p className="max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <Button asChild className="w-fit">
              <a href="/#">Shop now</a>
            </Button>
          </div>
        </div>
      </SlideshowSlide>
    </SlideshowContent>
    <SlideshowControls>
      {/* <SlideshowAutoplayControl /> 
      <SlideshowPreviousIndicator />
      <SlideshowPagination />
      <SlideshowNextIndicator /> */}
    </SlideshowControls>
  </Slideshow>
);
