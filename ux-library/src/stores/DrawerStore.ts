import { create } from 'zustand';

const CLOSE_ANIMATION_DELAY_MS = 400;
const closeTimeoutByKey = new Map<string, ReturnType<typeof setTimeout>>();

export interface DrawerInstanceProps<T = string> {
  id: string;
  data?: T;
  onClose?: () => boolean;
  closing?: boolean;
}

export interface DrawerStoreProps {
  drawers: Record<string, DrawerInstanceProps<any>>;
  open: <T>(key: string, data?: T, onClose?: () => boolean) => void;
  close: (key: string) => void;
}

export const DrawerStore = create<DrawerStoreProps>((set, get) => ({
  drawers: {},
  open: (key, data, onClose) => {
    const activeTimeout = closeTimeoutByKey.get(key);
    if (activeTimeout) {
      clearTimeout(activeTimeout);
      closeTimeoutByKey.delete(key);
    }

    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: { id: key, data, onClose, closing: false },
      },
    }));
  },
  close: (key) => {
    const drawer = get().drawers[key];
    if (!drawer || drawer.closing) {
      return;
    }

    if (!(drawer.onClose?.() ?? true)) {
      return;
    }

    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: { ...drawer, closing: true },
      },
    }));

    const activeTimeout = closeTimeoutByKey.get(key);
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }

    const closeTimeout = setTimeout(() => {
      set((state) => {
        const nextDrawer = state.drawers[key];

        if (!nextDrawer?.closing) {
          return state;
        }

        const newDrawers = { ...state.drawers };
        delete newDrawers[key];
        return { drawers: newDrawers };
      });
      closeTimeoutByKey.delete(key);
    }, CLOSE_ANIMATION_DELAY_MS);

    closeTimeoutByKey.set(key, closeTimeout);
  },
}));
