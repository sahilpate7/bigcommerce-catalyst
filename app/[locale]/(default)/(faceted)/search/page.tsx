import pick from 'lodash.pick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { Link } from '~/components/link';
import { ProductCard } from '~/components/product-card';
import { SearchForm } from '~/components/search-form';
import { LocaleType } from '~/i18n';

import { FacetedSearch } from '../_components/faceted-search';
import { MobileSideNav } from '../_components/mobile-side-nav';
import { SortBy } from '../_components/sort-by';
import { fetchFacetedSearch } from '../fetch-faceted-search';

interface Props {
  params: { locale: LocaleType };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: 'Search Results',
};

export default async function Search({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations('Search');
  const tPagination = await getTranslations({ locale, namespace: 'Pagination' });

  const messages = await getMessages({ locale });
  const searchTerm = typeof searchParams.term === 'string' ? searchParams.term : undefined;

  if (!searchTerm) {
    return (
      <>
        <h1 className="mb-3 text-4xl font-black lg:text-5xl">{t('heading')}</h1>
        <SearchForm />
      </>
    );
  }

  const search = await fetchFacetedSearch({ ...searchParams });

  const productsCollection = search.products;
  const products = productsCollection.items;

  if (products.length === 0) {
    return (
      <div>
        <h1 className="mb-3 text-4xl font-black lg:text-5xl">{t('heading')}</h1>

        <SearchForm initialTerm={searchTerm} />

        <p className="pv-6">
          <em>{t('noResults')}</em>
        </p>
      </div>
    );
  }

  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = productsCollection.pageInfo;

  return (
    <div>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, ['FacetedGroup', 'Product'])}
      >
        <div className="md:mb-8 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <h1 className="mb-3 text-base">
            {t('searchResults')} <br />
            <b className="text-2xl font-bold lg:text-3xl">"{searchTerm}"</b>
          </h1>

          <div className="flex flex-col items-center gap-3 whitespace-nowrap md:flex-row">
            <MobileSideNav>
              <FacetedSearch
                facets={search.facets.items}
                headingId="mobile-filter-heading"
                pageType="search"
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
            pageType="search"
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
                <Link href={`/search?term=${searchTerm}&before=${String(startCursor)}`}>
                  <span className="sr-only">{tPagination('prev')}</span>
                  <ChevronLeft aria-hidden="true" className="inline-block h-8 w-8" />
                </Link>
              ) : (
                <ChevronLeft aria-hidden="true" className="inline-block h-8 w-8 text-gray-200" />
              )}

              {hasNextPage ? (
                <Link href={`/search?term=${searchTerm}&after=${String(endCursor)}`}>
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
