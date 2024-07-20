import {
  IconBox,
  IconCategoryPlus,
  IconChecklist,
  IconLayoutDashboard,
  IconPrinter,
  IconScale,
  IconUser,
} from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: "1",
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Cadastro",
  },
  {
    id: "2",
    title: "Categorias",
    icon: IconCategoryPlus,
    href: "/categorias/create",
  },
  {
    id: "3",
    title: "Equipamentos",
    icon: IconPrinter,
    href: "/equipamentos/create",
  },
  {
    id: "4",
    title: "Requisitantes",
    icon: IconUser,
    href: "/requisitantes/create",
  },
  {
    id: "5",
    title: "Insumos",
    icon: IconBox,
    href: "/insumos/create",
  },
  {
    navlabel: true,
    subheader: "Estoque",
  },
  {
    id: "6",
    title: "Requisições",
    icon: IconChecklist,
    href: "/requisicoes-estoque",
  },
  {
    id: "7",
    title: "Saldo",
    icon: IconScale,
    href: "/estoque/saldo",
  },
];

export default Menuitems;
