type MenuItem = {
  href: string;
  label: string;
  submenu?: SubmenuItem[];
};

type SubmenuItem = {
  href: string;
  label: string;
  icon?: JSX.Element;
  desc?: string;
};

export type { MenuItem, SubmenuItem };
