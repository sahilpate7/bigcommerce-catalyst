import pick from 'lodash.pick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getBrand } from '~/client/queries/get-brand';
import { Link } from '~/components/link';
import { ProductCard } from '~/components/product-card';
import { LocaleType } from '~/i18n';

import { FacetedSearch } from '../../_components/faceted-search';
import { MobileSideNav } from '../../_components/mobile-side-nav';
import { SortBy } from '../../_components/sort-by';
import { fetchFacetedSearch } from '../../fetch-faceted-search';

interface Props {
  params: {
    slug: string;
    locale: LocaleType;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brandId = Number(params.slug);

  const brand = await getBrand({
    brandId,
  });

  const title = brand?.name;

  return {
    title,
  };
}

export default async function Brand({ params: { slug, locale }, searchParams }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Brand' });
  const tPagination = await getTranslations({ locale, namespace: 'Pagination' });
  const messages = await getMessages({ locale });

  const brandId = Number(slug);

  const search = await fetchFacetedSearch({ ...searchParams, brand: [slug] });

  const brand = await getBrand({
    brandId,
  });

  if (!brand) {
    notFound();
  }

  const productsCollection = search.products;
  const products = productsCollection.items;
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, ['FacetedGroup', 'Product'])}
      >
        <div className="md:mb-8 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <h1 className="mb-4 text-4xl font-black lg:mb-0 lg:text-5xl">{brand.name}</h1>

          <div className="flex flex-col items-center gap-3 whitespace-nowrap md:flex-row">
            <MobileSideNav>
              <FacetedSearch
                facets={search.facets.items}
                headingId="mobile-filter-heading"
                pageType="brand"
              />
            </MobileSideNav>
            <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-end md:gap-6">
              <SortBy />
              <div className="order-3 py-4 text-base font-semibold md:order-2 md:py-0">
                {t('sortBy', { items: productsCollection.collectionInfo?.totalItems ?? 0 })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <FacetedSearch
            className="mb-8 hidden lg:block"
            facets={search.facets.items}
            headingId="desktop-filter-heading"
            pageType="brand"
          />

          <section aria-labelledby="product-heading" className="col-span-4 lg:col-span-3">
            <h2 className="sr-only" id="product-heading">
              {t('products')}
            </h2>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
              {products.map((product, index) => (
                <ProductCard
                  imagePriority={index <= 3}
                  imageSize="wide"
                  key={product.entityId}
                  product={product}
                />
              ))}
            </div>

            <nav aria-label="Pagination" className="my-6 text-center text-blue-primary">
              {hasPreviousPage ? (
                <Link href={`${brand.path}?before=${String(startCursor)}`}>
                  <span className="sr-only">{tPagination('prev')}</span>
                  <ChevronLeft aria-hidden="true" className="inline-block h-8 w-8" />
                </Link>
              ) : (
                <ChevronLeft aria-hidden="true" className="inline-block h-8 w-8 text-gray-200" />
              )}

              {hasNextPage ? (
                <Link href={`${brand.path}?after=${String(endCursor)}`}>
                  <span className="sr-only">{tPagination('next')}</span>
                  <ChevronRight aria-hidden="true" className="inline-block h-8 w-8" />
                </Link>
              ) : (
                <ChevronRight aria-hidden="true" className="inline-block h-8 w-8 text-gray-200" />
              )}
            </nav>
          </section>
        </div>
      </NextIntlClientProvider>
    </div>
  );
}

export const runtime = 'edge';
