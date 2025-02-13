import pick from 'lodash.pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { Cart } from '~/components/header/cart';
import { ProductSheet } from '~/components/product-sheet';
import { LocaleType } from '~/i18n';

interface Props extends PropsWithChildren {
  params: { locale: LocaleType };
}

export default function DefaultLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <>
      <Header cart={<Cart />} />
      <main className="flex-1">
        {children}
      </main>
      <Suspense fallback={null}>
        <NextIntlClientProvider locale={locale} messages={pick(messages, 'Product')}>
          <ProductSheet />
        </NextIntlClientProvider>
      </Suspense>
      <Footer />
    </>
  );
}
