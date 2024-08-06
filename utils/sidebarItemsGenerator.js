import Link from "next/link";

export const sidebarItemsGenerator = (items, parentRoute, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        icon: item?.icon,
        label: (
          <Link href={`/${parentRoute}/${role}/${item.path}`}>{item.name}</Link>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              icon: item?.icon,
              label: (
                <Link href={`/${parentRoute}/${role}/${child.path}`}>
                  {child.name}
                </Link>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
