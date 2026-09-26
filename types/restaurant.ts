export interface RestaurantProfile {
  id: string;
  name: string;
  slug?: string;
  branchName: string;
  tableNumber: string;
  tableArea: string;
  isVerifiedDineIn: boolean;
  rating: number;
  reviewCount: string;
  openingHours: string;
  cuisine: string;
  avgPrice: string;
  address: string;
  mapUrl: string;
  currency?: string;
  unreadNotifications: number;
}

export interface HeroBannerConfig {
  badge: string;
  headline: string;
  subheadline: string;
  primaryActionText: string;
  secondaryActionText: string;
}

export interface PwaConfig {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  emoji: string;
  iconName?: string;
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  included?: boolean;
}

export interface ModifierGroup {
  id: string;
  title: string;
  required: boolean;
  type: 'radio' | 'checkbox';
  options: ModifierOption[];
}

export interface DishItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount?: string;
  prepTimeMinutes?: number;
  imageUrl: string;
  isVeg: boolean;
  badge?: string; // e.g. "Chef's Special"
  category: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  portionSizes?: ModifierOption[];
  modifierGroups?: ModifierGroup[];
}

export interface SpecialOfferConfig {
  badge: string;
  title: string;
  description: string;
  couponCode: string;
  buttonText: string;
}

export interface CartItemModifier {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface CartItem {
  dishId: string;
  dish: DishItem;
  quantity: number;
  portionSize?: string;
  variantId?: string;
  variantName?: string;
  selectedModifiers?: string[];
  modifiersList?: CartItemModifier[];
  notes?: string;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  tableNumber: string;
}

export type NavigationTab = 'menu' | 'floor_plan' | 'orders' | 'cart';

export interface PublicOrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: string | number;
  totalPrice: string | number;
  notes?: string | null;
  modifiers?: Array<{
    id: string;
    modifierId: string;
    name: string;
    unitPrice: string | number;
    quantity: number;
  }>;
}

export interface PublicOrder {
  id: string;
  orderNumber: number;
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  currency: string;
  tableId?: string | null;
  tableNumber: string;
  tableName?: string;
  tableArea?: string;
  status:
    | 'draft'
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'served'
    | 'completed'
    | 'cancelled';
  type: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  notes?: string | null;
  customer?: {
    name?: string | null;
    phone?: string | null;
  } | null;
  items: PublicOrderItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Top-level structure of api.json
 * When you connect your API later, your response can map 1-to-1 with this schema.
 */
export interface RestaurantApiResponse {
  restaurant: RestaurantProfile;
  heroBanner: HeroBannerConfig;
  pwaPromo: PwaConfig;
  categories: CategoryItem[];
  dishes: DishItem[];
  specialOffer: SpecialOfferConfig;
}

