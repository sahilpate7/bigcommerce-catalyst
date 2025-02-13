'use client';

import { AlertCircle, Check } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

import { Button } from '@bigcommerce/components/button';

import { Link } from '../link';

import { addToCart } from './_actions/add-to-cart';
import { AddToCart } from './add-to-cart';

import { Product } from '.';

export const Cart = ({ product }: { product: Partial<Product> }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());
  const t = useTranslations('Product.ProductSheet');

  if (!product.entityId) {
    return null;
  }

  newSearchParams.set('showQuickAdd', String(product.entityId));

  return Array.isArray(product.productOptions) && product.productOptions.length > 0 ? (
    <Button asChild>
      <Link
        className="mt-2 hover:text-white"
        href={`${pathname}?${newSearchParams.toString()}`}
        scroll={false}
      >
        {t('quickAdd')}
      </Link>
    </Button>
  ) : (
    <form
      action={async (formData: FormData) => {
        const result = await addToCart(formData);
        const quantity = Number(formData.get('quantity'));

        if (result?.error) {
          toast.error(result.error, { icon: <AlertCircle className="text-red-100" /> });

          return;
        }

        toast.success(
          () => (
            <div className="flex items-center gap-3">
              <span>
                {t.rich('addedProductQuantity', {
                  cartItems: quantity,
                  cartLink: (chunks) => (
                    <Link className="font-semibold text-blue-primary" href="/cart">
                      {chunks}
                    </Link>
                  ),
                })}
              </span>
            </div>
          ),
          { icon: <Check className="text-green-100" /> },
        );
      }}
    >
      <input name="product_id" type="hidden" value={product.entityId} />
      <input name="quantity" type="hidden" value={1} />
      <AddToCart />
    </form>
  );
};
