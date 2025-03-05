import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const DesktopMenu = async () => {
  const supabaseClient = await createClient();
  const { data } = await supabaseClient.from('categories').select('*');
  const categories = (data || []).filter(
    (category) => category.name !== 'Occasions',
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
            <NavigationMenuContent>
              {categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={`/${category.slug}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {category.name}
                    </NavigationMenuLink>
                  </Link>
                );
              })}
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <Link href="/occasion" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Occasions
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/professionnels" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Professionnels
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/realisations" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Réalisations
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
