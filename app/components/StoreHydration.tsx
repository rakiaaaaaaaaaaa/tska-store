'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useProductStore } from '@/store/useProductStore';

export default function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useProductStore.persist.rehydrate();
    useProductStore.getState().hydrate();
  }, []);
  return null;
}
